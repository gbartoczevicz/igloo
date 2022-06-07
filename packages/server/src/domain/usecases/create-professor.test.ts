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

  const id = new Id("id");

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
    professor: new Professor(
      id,
      id,
      id,
    ),
    manager: new InstitutionManager(
      id,
      id,
      id,
    ),
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

describe("Create Professor Use Case Tests", () => {
  it("should create a new professor", async () => {
    const { professorFactory, professor, usersRepo, user, manager, sut } =
      makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      professor
    );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const result = await sut.execute({
      manager,
      professorUserId: "any",
    });

    expect(result).toEqual(professor);
  });

  it("should not create when the professor is already relationated with the institution", () => {
    const {
      professorFactory,
      professor,
      professorsRepo,
      manager,
      user,
      usersRepo,
      sut,
    } = makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      professor
    );

    jest.spyOn(professorsRepo, "findByInstitutionAndUser")
      .mockImplementationOnce(
        () => Promise.resolve(professor),
      );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const promise = sut.execute({
      manager,
      professorUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.ProfessorAlreadyCreated);
  });

  it("should not create when the user to be student is the manager of the instituion", () => {
    const {
      idFactory,
      manager,
      sut,
    } = makeSut();

    jest.spyOn(idFactory, "create").mockImplementationOnce(() =>
      manager.userId
    );

    const promise = sut.execute({
      manager,
      professorUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(
      Errors.UserToBeProfessorIsAlreadyAManager,
    );
  });

  it("should not create when the user to be professor does not exists", () => {
    const {
      professorFactory,
      professor,
      manager,
      sut,
    } = makeSut();

    jest.spyOn(professorFactory, "create").mockImplementationOnce(() =>
      professor
    );

    const promise = sut.execute({
      manager,
      professorUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(
      Errors.UserToBeProfessorDoesNotExists,
    );
  });
});
