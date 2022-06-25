import { systemTestSetup } from "~/setup/system-test";
import {
  ClassCourse,
  InstitutionManager,
  Professor,
  ProfessorClassRegistration,
} from "../entities";
import { ClassStartDate, Id } from "../entities/values";
import * as Errors from "../errors";
import { RegisterProfessorIntoClassUseCase } from "./register-professor-into-class";

function makeSut() {
  const {
    repositories: {
      professorClassRegistrationsRepo: registrationsRepo,
      classCoursesRepo,
      professorsRepo,
    },
    factories: { professorClassRegistrationFactory: registrationFactory },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new RegisterProfessorIntoClassUseCase(
      registrationsRepo,
      registrationFactory,
      classCoursesRepo,
      professorsRepo,
    ),
    registrationsRepo,
    registrationFactory,
    classCoursesRepo,
    professorsRepo,
    fixture: {
      registration: new ProfessorClassRegistration(id, id, id),
      professor: new Professor(id, id, id),
      classCourse: new ClassCourse(
        id,
        id,
        "any",
        new ClassStartDate(new Date()),
      ),
      manager: new InstitutionManager(id, id, id),
    },
  };
}

describe("Register professor into class course use case tests suit", () => {
  it("should create a registration", async () => {
    const { sut, professorsRepo, classCoursesRepo, fixture } = makeSut();

    jest.spyOn(professorsRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(
        () => Promise.resolve(fixture.professor),
      );

    jest.spyOn(classCoursesRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(() => Promise.resolve(fixture.classCourse));

    const result = await sut.execute({
      ...fixture,
      classCourseId: "any",
      professorId: "any",
    });

    expect(result).toEqual(fixture.registration);
  });

  it("should check if the professor exists", () => {
    const { sut, fixture } = makeSut();

    const result = sut.execute({
      ...fixture,
      classCourseId: "any",
      professorId: "any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.ProfessorNotFound);
  });

  it("should check if the class course exists", () => {
    const { sut, professorsRepo, fixture } = makeSut();

    jest.spyOn(professorsRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(
        () => Promise.resolve(fixture.professor),
      );

    const result = sut.execute({
      ...fixture,
      classCourseId: "any",
      professorId: "any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.ClassCourseNotFound);
  });

  it("should check if the registration already exists", async () => {
    const {
      sut,
      professorsRepo,
      classCoursesRepo,
      registrationsRepo,
      fixture,
    } = makeSut();

    jest.spyOn(professorsRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(
        () => Promise.resolve(fixture.professor),
      );

    jest.spyOn(classCoursesRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(() => Promise.resolve(fixture.classCourse));

    jest.spyOn(registrationsRepo, "findByProfessorAndClassCourse")
      .mockImplementationOnce(() => Promise.resolve(fixture.registration));

    const result = sut.execute({
      ...fixture,
      classCourseId: "any",
      professorId: "any",
    });

    expect(result).rejects.toBeInstanceOf(
      Errors.ProfessorClassCourseRegistrationAlreadyCreated,
    );
  });
});
