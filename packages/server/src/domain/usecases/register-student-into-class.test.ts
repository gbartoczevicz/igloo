import { systemTestSetup } from "~/setup/system-test";
import { ClassCourse, Student, StudentClassRegistration } from "../entities";
import { ClassStartDate, Id } from "../entities/values";
import * as Errors from "../errors";
import { RegisterStudentIntoClassUseCase } from "./register-student-into-class";

function makeSut() {
  const {
    repositories: {
      studentClassRegistrationsRepo: registrationsRepo,
      classCoursesRepo,
      studentsRepo,
    },
    factories: { studentClassRegistrationFactory: registrationFactory },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new RegisterStudentIntoClassUseCase(
      registrationsRepo,
      registrationFactory,
      classCoursesRepo,
      studentsRepo,
    ),
    registrationsRepo,
    registrationFactory,
    classCoursesRepo,
    studentsRepo,
    fixture: {
      registration: new StudentClassRegistration(id, id, id),
      student: new Student(id, id, id),
      classCourse: new ClassCourse(
        id,
        id,
        "any",
        new ClassStartDate(new Date()),
      ),
    },
  };
}

describe("Register student into class course use case tests suit", () => {
  it("should create a registration", async () => {
    const { sut, studentsRepo, classCoursesRepo, fixture } = makeSut();

    jest.spyOn(studentsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(fixture.student)
    );

    jest.spyOn(classCoursesRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(fixture.classCourse)
    );

    const result = await sut.execute({
      classCourseId: "any",
      studentId: "any",
    });

    expect(result).toEqual(fixture.registration);
  });

  it("should check if the student exists", () => {
    const { sut } = makeSut();

    const result = sut.execute({
      classCourseId: "any",
      studentId: "any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.StudentNotFound);
  });

  it("should check if the class course exists", () => {
    const { sut, studentsRepo, fixture } = makeSut();

    jest.spyOn(studentsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(fixture.student)
    );

    const result = sut.execute({
      classCourseId: "any",
      studentId: "any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.ClassCourseNotFound);
  });

  it("should check if the registration already exists", async () => {
    const { sut, studentsRepo, classCoursesRepo, registrationsRepo, fixture } =
      makeSut();

    jest.spyOn(studentsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(fixture.student)
    );

    jest.spyOn(classCoursesRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(fixture.classCourse)
    );

    jest.spyOn(registrationsRepo, "findByStudentAndClassCourse")
      .mockImplementationOnce(() => Promise.resolve(fixture.registration));

    const result = sut.execute({
      classCourseId: "any",
      studentId: "any",
    });

    expect(result).rejects.toBeInstanceOf(
      Errors.StudentClassCourseRegistrationAlreadyCreated,
    );
  });
});
