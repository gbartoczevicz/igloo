import { systemTestSetup } from "~/setup/system-test";
import { InstitutionManager, User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import * as Errors from "~/domain/errors";
import { AuthenticateManagerUseCase } from "./authenticate-manager";

function makeSut() {
  const {
    factories: { idFactory },
    repositories: { institutionManagersRepo: managersRepo },
  } = systemTestSetup();

  const id = new Id("any");

  const email = new Email("any");
  const password = new Password("any");
  const phone = new Phone("any");

  return {
    sut: new AuthenticateManagerUseCase(idFactory, managersRepo),
    idFactory,
    managersRepo,
    manager: new InstitutionManager(id, id, id),
    user: new User(
      id,
      "any",
      null,
      email,
      password,
      phone,
    ),
    id,
    anotherUser: new User(
      new Id("another_id"),
      "any",
      null,
      email,
      password,
      phone,
    ),
  };
}

describe("Authenticate Manager Use Case Tests", () => {
  it("should authenticate the user as a manager", async () => {
    const { sut, idFactory, manager, managersRepo, id, user } = makeSut();

    jest.spyOn(idFactory, "create").mockImplementationOnce(() => id);

    jest.spyOn(managersRepo, "findByInstitutionId").mockImplementationOnce(() =>
      Promise.resolve(manager)
    );

    const result = await sut.execute({
      institutionId: id.value,
      user,
    });

    expect(result).toEqual(manager);
  });

  it("should validate if the manager exists", () => {
    const { sut, idFactory, id, user } = makeSut();

    jest.spyOn(idFactory, "create").mockImplementationOnce(() => id);

    const result = sut.execute({
      institutionId: id.value,
      user,
    });

    expect(result).rejects.toBeInstanceOf(Errors.ManagerNotFound);
  });

  it("should validate if the user is a manager", () => {
    const { sut, idFactory, id, anotherUser, manager, managersRepo } =
      makeSut();

    jest.spyOn(idFactory, "create").mockImplementationOnce(() => id);

    jest.spyOn(managersRepo, "findByInstitutionId").mockImplementationOnce(() =>
      Promise.resolve(manager)
    );

    const result = sut.execute({
      institutionId: id.value,
      user: anotherUser,
    });

    expect(result).rejects.toBeInstanceOf(Errors.NotAManager);
  });
});
