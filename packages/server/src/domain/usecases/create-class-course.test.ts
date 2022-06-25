import { systemTestSetup } from "~/setup/system-test";
import { ClassCourse, Course } from "../entities";
import { ClassStartDate, Id } from "../entities/values";
import { CreateClassCourseUseCase } from "./create-class-course";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    factories: { classCourseFactory },
    repositories: { coursesRepo, classCoursesRepo },
  } = systemTestSetup();

  const id = new Id("any");

  const start = new ClassStartDate(new Date(2022, 0, 1));

  return {
    sut: new CreateClassCourseUseCase(
      classCourseFactory,
      classCoursesRepo,
      coursesRepo,
    ),
    classCourseFactory,
    classCoursesRepo,
    coursesRepo,
    course: new Course(id, "any", id),
    start,
    classCourse: new ClassCourse(id, id, "any", start),
  };
}

describe("Create Class Course Use Case Test Suit", () => {
  it("should create a class course", async () => {
    const { sut, classCourse, classCourseFactory, coursesRepo, course } =
      makeSut();

    jest.spyOn(classCourseFactory, "create").mockImplementationOnce(() =>
      classCourse
    );

    jest.spyOn(coursesRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(course)
    );

    const result = await sut.execute({
      courseId: classCourse.courseId.value,
      name: classCourse.name,
      start: classCourse.start,
    });

    expect(result).toEqual(classCourse);
  });

  it("should check if the class course is already created", () => {
    const { sut, classCourse, classCourseFactory, classCoursesRepo } =
      makeSut();

    jest.spyOn(classCourseFactory, "create").mockImplementationOnce(() =>
      classCourse
    );

    jest.spyOn(classCoursesRepo, "findByCourseIdAndStart")
      .mockImplementationOnce(() => Promise.resolve(classCourse));

    const result = sut.execute({
      courseId: classCourse.courseId.value,
      name: classCourse.name,
      start: classCourse.start,
    });

    expect(result).rejects.toBeInstanceOf(
      Errors.ClassCourseWithSameCourseAndStartAlreadyCreated,
    );
  });

  it("should check if the course does not exists", () => {
    const { sut, classCourse, classCourseFactory } = makeSut();

    jest.spyOn(classCourseFactory, "create").mockImplementationOnce(() =>
      classCourse
    );

    const result = sut.execute({
      courseId: classCourse.courseId.value,
      name: classCourse.name,
      start: classCourse.start,
    });

    expect(result).rejects.toBeInstanceOf(
      Errors.CourseNotExists,
    );
  });
});
