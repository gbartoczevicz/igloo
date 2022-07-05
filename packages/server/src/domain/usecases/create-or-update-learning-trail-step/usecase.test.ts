import { LearningTrail, LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateLearningTrailStepUseCase } from "./usecase";

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
    sut: new CreateOrUpdateLearningTrailStepUseCase(
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

describe("Create or Update Lerning Trail Step Use Case", () => {
  it("should upsert a step when the trail position is not in use", async () => {
    const { sut, learningTrailsRepo, learningTrailStepsRepo, fixture } =
      createSut();

    const findByIdAndInstitutionId = jest.spyOn(
      learningTrailsRepo,
      "findByIdAndInstitutionId",
    ).mockImplementationOnce(() => Promise.resolve(fixture.trail));
    const save = jest.spyOn(learningTrailStepsRepo, "save");

    await sut.execute(fixture.step, fixture.institutionId);

    expect(findByIdAndInstitutionId).toBeCalledWith(
      fixture.step.learningTrailId,
      fixture.institutionId,
    );
    expect(save).toBeCalledWith(fixture.step);
  });

  it("should upsert a step even the trail position is already in use by the same step", async () => {
    const { sut, learningTrailsRepo, learningTrailStepsRepo, fixture } =
      createSut();

    const findByIdAndInstitutionId = jest.spyOn(
      learningTrailsRepo,
      "findByIdAndInstitutionId",
    ).mockImplementationOnce(() => Promise.resolve(fixture.trail));
    const findByLearningTrailIdAndPosition = jest.spyOn(
      learningTrailStepsRepo,
      "findByLearningTrailIdAndPosition",
    ).mockImplementationOnce(() => Promise.resolve(fixture.step));
    const save = jest.spyOn(learningTrailStepsRepo, "save");

    await sut.execute(fixture.step, fixture.institutionId);

    expect(findByIdAndInstitutionId).toBeCalledWith(
      fixture.step.learningTrailId,
      fixture.institutionId,
    );
    expect(findByLearningTrailIdAndPosition).toBeCalledWith(
      fixture.step.learningTrailId,
      fixture.step.position,
    );
    expect(save).toBeCalledWith(fixture.step);
  });

  it("should validate if the trail exists before upserting a step", () => {
    const { sut, fixture } = createSut();

    const rejection = sut.execute(fixture.step, fixture.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.TrailNotFound);
  });

  it("should validate if the trail position is being used by another step", () => {
    const { sut, learningTrailStepsRepo, learningTrailsRepo, fixture } =
      createSut();

    jest.spyOn(
      learningTrailsRepo,
      "findByIdAndInstitutionId",
    ).mockImplementationOnce(() => Promise.resolve(fixture.trail));
    jest.spyOn(
      learningTrailStepsRepo,
      "findByLearningTrailIdAndPosition",
    ).mockImplementationOnce(() => Promise.resolve(fixture.anotherStep));

    const rejection = sut.execute(fixture.step, fixture.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.PositionAlreadyInUse);
  });
});
