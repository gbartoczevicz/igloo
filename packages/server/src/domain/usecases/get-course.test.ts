import { systemTestSetup } from "~/setup/system-test";
import { Course } from "../entities";
import { Id } from "../entities/values";
import { GetCourseUseCase } from "./get-course";

function makeSut() {
  const {
    factories: { idFactory },
    repositories: { coursesRepo },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new GetCourseUseCase(idFactory, coursesRepo),
    idFactory,
    coursesRepo,
    id,
    course: new Course(id, "any", id),
  };
}

describe("Get Course Use Case Tests", () => {
  it("should get the expected course", async () => {
    const { sut, course, coursesRepo, id, idFactory } = makeSut();

    jest.spyOn(idFactory, "create").mockImplementationOnce(() =>
      id
    );

    jest.spyOn(coursesRepo, "findById").mockImplementationOnce(() => Promise.resolve(course))

    const result = await sut.execute({
      courseId: "any"
    });

    expect(result).toEqual(course);
  });
});
