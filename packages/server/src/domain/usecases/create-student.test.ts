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

  const id = new Id("id");

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
    student: new Student(id, id, id),
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

describe("Create Student Use Case Tests", () => {
  it("should create a new student", async () => {
    const {
      studentFactory,
      student,
      usersRepo,
      user,
      manager,
      sut,
    } = makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => student);

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const result = await sut.execute({
      manager,
      studentUserId: "any",
    });

    expect(result).toEqual(student);
  });

  it("should not create when the student is already relationated with the institution", () => {
    const {
      studentFactory,
      student,
      studentsRepo,
      manager,
      user,
      usersRepo,
      sut,
    } = makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => student);

    jest.spyOn(studentsRepo, "findByInstitutionAndUser").mockImplementationOnce(
      () => Promise.resolve(student),
    );

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const promise = sut.execute({
      manager,
      studentUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.StudentAlreadyCreated);
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
      studentUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(
      Errors.UserToBeStudentIsAlreadyAManager,
    );
  });

  it("should not create when the user to be student does not exists", () => {
    const {
      studentFactory,
      student,
      manager,
      sut,
    } = makeSut();

    jest.spyOn(studentFactory, "create").mockImplementationOnce(() => student);

    const promise = sut.execute({
      manager,
      studentUserId: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.UserToBeStudentDoesNotExists);
  });
});
