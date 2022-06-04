import { CreateCourseUseCase } from "./create-course";
import { systemTestSetup } from "~/setup/system-test";
import { Course, InstitutionManager } from "../entities";
import { Id } from "../entities/values";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    factories: { courseFactory },
    repositories: { coursesRepo },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateCourseUseCase(courseFactory, coursesRepo),
    courseFactory,
    coursesRepo,
    course: new Course(id, "any", id),
    manager: new InstitutionManager(id, id, id),
  };
}

describe("Create Discipline Use Case Tests", () => {
  it("should create a course", async () => {
    const { course, manager, courseFactory, coursesRepo, sut } = makeSut();

    jest.spyOn(courseFactory, "create").mockImplementationOnce(() => course);

    const result = await sut.execute({
      manager,
      name: "any",
    });

    expect(result).toEqual(course);
  });

  it("should validate if the course name is already in use", () => {
    const {
      manager,
      course,
      coursesRepo,
      courseFactory,
      sut,
    } = makeSut();

    jest.spyOn(courseFactory, "create").mockImplementationOnce(() => course);

    jest.spyOn(coursesRepo, "findAllByInstitutionId").mockImplementationOnce(
      () => Promise.resolve([course]),
    );

    const promise = sut.execute({
      manager,
      name: "any",
    });

    expect(promise).rejects.toBeInstanceOf(Errors.CourseNameAlreadyInUse);
  });
});
