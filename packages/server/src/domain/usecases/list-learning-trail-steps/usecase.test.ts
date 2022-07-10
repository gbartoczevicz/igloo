import { LearningTrail, LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { ListLearningTrailStepsUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      learningTrailStepsRepo,
      learningTrailsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");
  const date = new Date();

  return {
    sut: new ListLearningTrailStepsUseCase(
      learningTrailsRepo,
      learningTrailStepsRepo,
    ),
    learningTrailsRepo,
    learningTrailStepsRepo,
    fixture: {
      institutionId: id,
      step: new LearningTrailStep(id, 0, id, date, date, date, date),
      anotherStep: new LearningTrailStep(
        new Id("another"),
        0,
        id,
        date,
        date,
        date,
        date,
      ),
      trail: new LearningTrail(id, "any", id),
    },
  };
}

describe("List Lerning Trail Step Use Case", () => {
  it("should list the expected trail steps", async () => {
    const { sut, learningTrailsRepo, learningTrailStepsRepo, fixture } =
      createSut();

    jest.spyOn(
      learningTrailsRepo,
      "findByIdAndInstitutionId",
    ).mockImplementationOnce(() => Promise.resolve(fixture.trail));
    jest.spyOn(
      learningTrailStepsRepo,
      "findAllByLearningTrailId",
    ).mockImplementationOnce(() => Promise.resolve([fixture.step]));

    const result = await sut.execute(fixture.trail.id, fixture.institutionId);

    expect(result).toEqual([fixture.step]);
  });

  it("should validate if the trail exists before listing its steps", async () => {
    const { sut, fixture } = createSut();

    const rejection = sut.execute(fixture.trail.id, fixture.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.TrailNotFound);
  });
});
