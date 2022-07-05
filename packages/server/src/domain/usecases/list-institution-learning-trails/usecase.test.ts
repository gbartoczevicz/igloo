import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import { ListInstitutionLearningTrailsUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      learningTrailsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new ListInstitutionLearningTrailsUseCase(learningTrailsRepo),
    learningTrailsRepo,
    fixture: {
      learningTrail: new LearningTrail(id, "any", id),
      institutionId: id,
    },
  };
}

describe("List Institution Learning Trails Use Case", () => {
  it("should return the expected learning trails", async () => {
    const { sut, learningTrailsRepo, fixture } = createSut();

    const findAllByInstitutionId = jest.spyOn(
      learningTrailsRepo,
      "findAllByInstitutionId",
    ).mockImplementationOnce(() => Promise.resolve([fixture.learningTrail]));

    const result = await sut.execute(fixture.institutionId);

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(fixture.learningTrail);
    expect(findAllByInstitutionId).toBeCalledWith(fixture.institutionId);
  });
});
