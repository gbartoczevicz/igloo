import { systemTestSetup } from "~/setup/system-test";
import { Course, InstitutionManager } from "../entities";
import { Id } from "../entities/values";
import { GetInstitutionCoursesUseCase } from "./get-institution-courses";

function makeSut() {
  const {
    repositories: { coursesRepo },
    factories: { idFactory },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new GetInstitutionCoursesUseCase(idFactory, coursesRepo),
    coursesRepo,
    course: new Course(id, "any", id),
  };
}

describe("Get Institution Courses Use Case Tests", () => {
  it("should get the expected course list", async () => {
    const { sut, course, coursesRepo } = makeSut();

    jest.spyOn(coursesRepo, "findAllByInstitutionId").mockImplementationOnce(
      () => Promise.resolve([course]),
    );

    const result = await sut.execute({ institutionId: "any" });

    expect(result).toContainEqual(course);
  });
});
