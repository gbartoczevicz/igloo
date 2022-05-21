import { systemTestSetup } from "~/setup/system-test";
import { Course, Discipline, InstitutionManager } from "../entities";
import { Id } from "../entities/values";
import { CreateDisciplinesUseCase } from "./create-discipline";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    factories: { disciplineFactory },
    repositories: { disciplinesRepo, coursesRepo },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateDisciplinesUseCase(
      disciplineFactory,
      disciplinesRepo,
      coursesRepo,
    ),
    disciplineFactory,
    disciplinesRepo,
    coursesRepo,
    discipline: new Discipline(id, "any", id),
    course: new Course(id, "any", id),
    manager: new InstitutionManager(id, id, id),
    managerFromAnotherInstitution: new InstitutionManager(
      id,
      id,
      new Id("any_institution"),
    ),
  };
}

describe("Create Discipline Use Case Tests", () => {
  it("should create a discipline", async () => {
    const { discipline, course, manager, disciplineFactory, coursesRepo, sut } =
      makeSut();

    jest.spyOn(disciplineFactory, "create").mockImplementationOnce(() =>
      discipline
    );

    jest.spyOn(coursesRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(course),
    );

    const result = await sut.execute({
      courseId: "any",
      manager,
      name: "any",
    });

    expect(result).toEqual(discipline);
  });

  it("should validate if the course exists", () => {
    const { discipline, manager, disciplineFactory, sut } = makeSut();

    jest.spyOn(disciplineFactory, "create").mockImplementationOnce(() =>
      discipline
    );

    const promise = sut.execute({
      courseId: "any",
      manager,
      name: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.CourseNotExists);
  });

  it("should validate if the discipline name is already in use", () => {
    const {
      discipline,
      manager,
      course,
      coursesRepo,
      disciplinesRepo,
      disciplineFactory,
      sut,
    } = makeSut();

    jest.spyOn(disciplineFactory, "create").mockImplementationOnce(() =>
      discipline
    );

    jest.spyOn(disciplinesRepo, "findAllByCourseId").mockImplementationOnce(
      () => Promise.resolve([discipline]),
    );

    jest.spyOn(coursesRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(course),
    );

    const promise = sut.execute({
      courseId: "any",
      manager,
      name: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.CourseNameAlreadyInUse);
  });
});
