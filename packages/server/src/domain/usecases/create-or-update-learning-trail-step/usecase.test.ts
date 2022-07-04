import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateLearningTrailStepUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      learningTrailStepsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");
  const date = new Date();

  return {
    sut: new CreateOrUpdateLearningTrailStepUseCase(learningTrailStepsRepo),
    learningTrailStepsRepo,
    fixture: {
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
    },
  };
}

describe("Create or Update Lerning Trail Step Use Case", () => {
  it("should create a step", async () => {
    const { sut, learningTrailStepsRepo, fixture } = createSut();

    const save = jest.spyOn(learningTrailStepsRepo, "save");

    await sut.execute(fixture.step);

    expect(save).toBeCalledWith(fixture.step);
  });

  it("should validate if the trail position is already in use by the same step", async () => {
    const { sut, learningTrailStepsRepo, fixture } = createSut();

    const save = jest.spyOn(learningTrailStepsRepo, "save");
    const findByLearningTrailIdAndPosition = jest.spyOn(
      learningTrailStepsRepo,
      "findByLearningTrailIdAndPosition",
    ).mockImplementationOnce(() => Promise.resolve(fixture.step));

    await sut.execute(fixture.step);

    expect(findByLearningTrailIdAndPosition).toBeCalledWith(
      fixture.step.learningTrailId,
      fixture.step.position,
    );
    expect(save).toBeCalledWith(fixture.step);
  });

  it("should validate if the trail position is already in use by another step", () => {
    const { sut, learningTrailStepsRepo, fixture } = createSut();

    const findByLearningTrailIdAndPosition = jest.spyOn(
      learningTrailStepsRepo,
      "findByLearningTrailIdAndPosition",
    ).mockImplementationOnce(() => Promise.resolve(fixture.anotherStep));

    const rejection = sut.execute(fixture.step);

    expect(rejection).rejects.toBeInstanceOf(Errors.PositionAlreadyInUse);
    expect(findByLearningTrailIdAndPosition).toBeCalledWith(
      fixture.step.learningTrailId,
      fixture.step.position,
    );
  });
});
