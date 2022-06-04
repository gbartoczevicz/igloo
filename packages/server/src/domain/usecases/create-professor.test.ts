import { systemTestSetup } from "~/setup/system-test";
import { InstitutionManager, Professor, User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { CreateProfessorUseCase } from "./create-professor";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    factories: { professorFactory, idFactory },
    repositories: { professorsRepo, usersRepo },
  } = systemTestSetup();

  const anyId = new Id("any");

  return {
    sut: new CreateProfessorUseCase(
      professorsRepo,
      usersRepo,
      professorFactory,
      idFactory,
    ),
    professorFactory,
    idFactory,
    professorsRepo,
    usersRepo,
    aProfessor: new Professor(
      anyId,
      anyId,
      anyId,
    ),
    aManager: new InstitutionManager(
      anyId,
      anyId,
      anyId,
    ),
    anUser: new User(
      anyId,
      "any",
      null,
      new Email("any"),
      new Password("any"),
      new Phone("any"),
    ),
  };
}

describe("Create Professor Use Case Tests", () => {
  it("should create a new professor", async () => {
    const { professorFactory, aProfessor, usersRepo, anUser, aManager, sut } =
      makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      aProfessor
    );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const result = await sut.execute({
      manager: aManager,
      professorUserId: "any",
    });

    expect(result).toEqual(aProfessor);
  });

  it("should not create when the professor is already relationated with the institution", () => {
    const {
      professorFactory,
      aProfessor,
      professorsRepo,
      aManager,
      anUser,
      usersRepo,
      sut,
    } = makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      aProfessor
    );

    jest.spyOn(professorsRepo, "findByInstitutionAndUser")
      .mockImplementationOnce(
        () => Promise.resolve(aProfessor),
      );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const promise = sut.execute({
      manager: aManager,
      professorUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.ProfessorAlreadyCreated);
  });

  it("should not create when the user to be professor does not exists", () => {
    const {
      professorFactory,
      aProfessor,
      aManager,
      sut,
    } = makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      aProfessor
    );

    const promise = sut.execute({
      manager: aManager,
      professorUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(
      Errors.UserToBeProfessorDoesNotExists,
    );
  });
});
