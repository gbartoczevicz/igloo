import { systemTestSetup } from "~/setup/system-test";
import { Institution, InstitutionManager, User } from "../entities";
import * as Errors from "~/domain/errors";
import { Cnpj, Email, Id, Password, Phone } from "../entities/values";
import { CreateInstitutionManagerUseCase } from "./create-institution-manager";

function makeSut() {
  const {
    repositories: { institutionManagersRepo, institutionsRepo },
    factories: { managerFactory },
  } = systemTestSetup();

  const id = new Id("any");
  const phone = new Phone("any");

  return {
    sut: new CreateInstitutionManagerUseCase(
      institutionManagersRepo,
      institutionsRepo,
      managerFactory,
    ),
    institutionManagersRepo,
    institutionsRepo,
    managerFactory,
    user: new User(
      id,
      "any",
      null,
      new Email("any"),
      new Password("any"),
      phone,
    ),
    institution: new Institution(id, "any", new Cnpj("any"), phone),
    manager: new InstitutionManager(id, id, id),
  };
}

describe("Create Institution Manager Use Case Tests", () => {
  it("should create an institution", async () => {
    const {
      sut,
      institutionsRepo,
      institution,
      managerFactory,
      manager,
      user,
    } = makeSut();

    jest.spyOn(institutionsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(institution)
    );

    jest.spyOn(managerFactory, "create").mockImplementationOnce(() => manager);

    const result = await sut.execute({
      institution,
      user,
    });

    expect(result).toEqual(manager);
  });

  it("should validate if the institution already have a manager", () => {
    const {
      sut,
      institutionsRepo,
      institutionManagersRepo,
      institution,
      managerFactory,
      manager,
      user,
    } = makeSut();

    jest.spyOn(institutionsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(institution)
    );

    jest.spyOn(institutionManagersRepo, "findByInstitutionId")
      .mockImplementationOnce(() => Promise.resolve(manager));

    jest.spyOn(managerFactory, "create").mockImplementationOnce(() => manager);

    const promise = sut.execute({
      institution,
      user,
    });

    expect(promise).rejects.toBeInstanceOf(
      Errors.InstitutionAlreadyHaveManager,
    );
  });

  it("should validate if the institution exists", () => {
    const { sut, institution, managerFactory, manager, user } = makeSut();

    jest.spyOn(managerFactory, "create").mockImplementationOnce(() => manager);

    const promise = sut.execute({
      institution,
      user,
    });

    expect(promise).rejects.toBeInstanceOf(Errors.InstitutionNotExists);
  });
});
