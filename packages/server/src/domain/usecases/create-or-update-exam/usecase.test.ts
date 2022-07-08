import { Exam, LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateExamUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examsRepo,
      learningTrailStepsRepo: stepsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");
  const date = new Date();

  return {
    sut: new CreateOrUpdateExamUseCase(examsRepo, stepsRepo),
    examsRepo,
    stepsRepo,
    fixtures: {
      institutionId: id,
      step: new LearningTrailStep(id, 0, id, date, date, date, date),
      exam: new Exam(id, id),
      anotherExam: new Exam(new Id("another"), id),
    },
  };
}

describe("Create or Update Exam Use Case", () => {
  it("should persist an exam", async () => {
    const { sut, stepsRepo, examsRepo, fixtures } = createSut();

    jest.spyOn(stepsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixtures.step),
    );

    const save = jest.spyOn(examsRepo, "save");

    await sut.execute(fixtures.exam, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.exam);
  });

  it("should persist an exam even when its found", async () => {
    const { sut, stepsRepo, examsRepo, fixtures } = createSut();

    jest.spyOn(stepsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixtures.step),
    );

    jest.spyOn(examsRepo, "findByLearningTrailStepId").mockImplementationOnce(
      () => Promise.resolve(fixtures.exam),
    );

    const save = jest.spyOn(examsRepo, "save");

    await sut.execute(fixtures.exam, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.exam);
  });

  it("should not persist an exam when another one is found", () => {
    const { sut, stepsRepo, examsRepo, fixtures } = createSut();

    jest.spyOn(stepsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixtures.step),
    );

    jest.spyOn(examsRepo, "findByLearningTrailStepId").mockImplementationOnce(
      () => Promise.resolve(fixtures.anotherExam),
    );

    const rejection = sut.execute(fixtures.exam, fixtures.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.StepAlreadyHaveExam);
  });

  it("should not persist an exam when its step is not found", () => {
    const { sut, fixtures } = createSut();

    const rejection = sut.execute(fixtures.exam, fixtures.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.StepNotFound);
  });
});
