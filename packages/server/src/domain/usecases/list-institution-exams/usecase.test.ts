import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import { ListInstitutionExamsUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new ListInstitutionExamsUseCase(
      examsRepo,
    ),
    examsRepo,
    fixtures: {
      exam: new Exam(id, id),
      institutionId: id,
    },
  };
}

describe("List Institution Exams Use Case", () => {
  it("should list the expected trail steps", async () => {
    const { sut, examsRepo, fixtures } = createSut();

    jest.spyOn(examsRepo, "findAllByInstitutionId").mockImplementationOnce(() =>
      Promise.resolve([fixtures.exam])
    );

    const result = await sut.execute(fixtures.institutionId);

    expect(result).toEqual([fixtures.exam]);
  });
});
