import { systemTestSetup } from "~/setup/system-test";
import { InstitutionManager, Student, User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { CreateStudentUseCase } from "./create-student";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    factories: { studentFactory, idFactory },
    repositories: { studentsRepo, usersRepo },
  } = systemTestSetup();

  const anyId = new Id("any");

  return {
    sut: new CreateStudentUseCase(
      studentsRepo,
      usersRepo,
      studentFactory,
      idFactory,
    ),
    studentFactory,
    idFactory,
    studentsRepo,
    usersRepo,
    aStudent: new Student(
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

describe("Create Student Use Case Tests", () => {
  it("should create a new student", async () => {
    const { studentFactory, aStudent, usersRepo, anUser, aManager, sut } =
      makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => aStudent);

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const result = await sut.execute({
      manager: aManager,
      studentUserId: "any",
    });

    expect(result).toEqual(aStudent);
  });

  it("should not create when the student is already relationated with the institution", () => {
    const {
      studentFactory,
      aStudent,
      studentsRepo,
      aManager,
      anUser,
      usersRepo,
      sut,
    } = makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => aStudent);

    jest.spyOn(studentsRepo, "findByInstitutionAndUser").mockImplementationOnce(
      () => Promise.resolve(aStudent),
    );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const promise = sut.execute({
      manager: aManager,
      studentUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.StudentAlreadyCreated);
  });

  it("should not create when the user to be student does not exists", () => {
    const {
      studentFactory,
      aStudent,
      aManager,
      sut,
    } = makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => aStudent);

    const promise = sut.execute({
      manager: aManager,
      studentUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.UserToBeStudentDoesNotExists);
  });
});
