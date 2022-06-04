import { systemTestSetup } from "~/setup/system-test";
import { Course, Discipline } from "../entities";
import { Id } from "../entities/values";
import { ListInstitutionDisciplinesUseCase } from "./list-institution-disciplines";

function makeSut() {
  const {
    repositories: {
      disciplinesRepo,
      coursesRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");
  const name = "any";

  return {
    sut: new ListInstitutionDisciplinesUseCase(disciplinesRepo, coursesRepo),
    disciplinesRepo,
    coursesRepo,
    course: new Course(id, name, id),
    discipline: new Discipline(id, name, id),
  };
}

describe("List Institution Disciplines Use Case Tests", () => {
  it("should get the expected discipline list", async () => {
    const { sut, course, coursesRepo, discipline, disciplinesRepo } = makeSut();

    jest.spyOn(coursesRepo, "findAllByInstitutionId").mockImplementationOnce(
      () => Promise.resolve([course]),
    );

    jest.spyOn(disciplinesRepo, "findAllByCoursesId").mockImplementationOnce(
      () => Promise.resolve([discipline]),
    );

    const result = await sut.execute({ institutionId: course.institutionId });

    expect(result).toContainEqual(discipline);
  });
});
