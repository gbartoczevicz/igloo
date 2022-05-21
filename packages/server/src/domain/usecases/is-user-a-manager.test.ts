import { systemTestSetup } from "~/setup/system-test";
import { InstitutionManager, User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { IsUserAManagerUseCase } from "./is-user-a-manager";

function makeSut() {
  const {
    repositories: { institutionManagersRepo: managersRepo },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new IsUserAManagerUseCase(managersRepo),
    managersRepo,
    manager: new InstitutionManager(id, id, id),
    user: new User(
      id,
      "any",
      null,
      new Email("any"),
      new Password("any"),
      new Phone("any"),
    ),
  };
}

describe("Is User a Manager Use Case Tests", () => {
  it("should return true when at least one manager is found", async () => {
    const { sut, user, manager, managersRepo } = makeSut();

    jest.spyOn(managersRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([manager])
    );

    const result = await sut.execute({
      user,
    });

    expect(result).toBeTruthy();
  });

  it("should return false when none manager is found", async () => {
    const { sut, user, managersRepo } = makeSut();

    jest.spyOn(managersRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([])
    );

    const result = await sut.execute({
      user,
    });

    expect(result).toBeFalsy();
  });
});
