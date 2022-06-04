import { systemTestSetup } from "~/setup/system-test";
import {
  InstitutionManager,
  Student,
  StudentUserComposition,
  User,
} from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { GetStudentsByManagerUseCase } from "./get-students-by-manager";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    repositories: { studentsRepo, usersRepo },
  } = systemTestSetup();

  const id = new Id("any");

  const user = new User(
    id,
    "any",
    null,
    new Email("any"),
    new Password("any"),
    new Phone("any"),
  );
  const student = new Student(id, user.id, id);
  const studentOfAnotherUser = new Student(id, new Id("any_other"), id);

  return {
    sut: new GetStudentsByManagerUseCase(studentsRepo, usersRepo),
    studentsRepo,
    usersRepo,
    manager: new InstitutionManager(id, id, id),
    user,
    student,
    studentOfAnotherUser,
    composition: new StudentUserComposition(student, user),
  };
}

describe("Get Students by Manager Use Case test", () => {
  it("should get the expected student list", async () => {
    const {
      sut,
      manager,
      student,
      studentsRepo,
      user,
      usersRepo,
      composition,
    } = makeSut();

    jest.spyOn(studentsRepo, "findAllByInstitution").mockImplementationOnce(
      () => Promise.resolve([student]),
    );

    jest.spyOn(usersRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([user])
    );

    const result = await sut.execute({ manager });

    expect(result).toContainEqual(composition);
  });

  it("should throw an error when the user from student is not found", () => {
    const {
      sut,
      manager,
      studentOfAnotherUser,
      studentsRepo,
      user,
      usersRepo,
    } = makeSut();

    jest.spyOn(studentsRepo, "findAllByInstitution").mockImplementationOnce(
      () => Promise.resolve([studentOfAnotherUser]),
    );

    jest.spyOn(usersRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([user])
    );

    const result = sut.execute({ manager });

    expect(result).rejects.toBeInstanceOf(Errors.UserNotFoundWithStudent);
  });
});
