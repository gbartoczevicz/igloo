import {
  Exam,
  ExamQuestion,
  LearningTrail,
  LearningTrailStep,
} from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateExamQuestionUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examQuestionsRepo,
      examsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateOrUpdateExamQuestionUseCase(
      examQuestionsRepo,
      examsRepo,
    ),
    examQuestionsRepo,
    examsRepo,
    fixture: {
      institutionId: id,
      exam: new Exam(id, id),
      question: new ExamQuestion(id, 0, id),
      anotherQuestion: new ExamQuestion(new Id("another"), 0, id),
    },
  };
}

describe("Create or Update Exam Question Use Case", () => {
  it("should upsert a question when the exam position is not in use", async () => {
    const { sut, examQuestionsRepo, examsRepo, fixture } = createSut();

    jest.spyOn(examsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixture.exam),
    );

    const save = jest.spyOn(examQuestionsRepo, "save");

    await sut.execute(fixture.question, fixture.institutionId);

    expect(save).toBeCalledWith(fixture.question);
  });

  it("should upsert a question even the exam position is already in use by the same question", async () => {
    const { sut, examQuestionsRepo, examsRepo, fixture } = createSut();

    jest.spyOn(examsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixture.exam),
    );
    jest.spyOn(examQuestionsRepo, "findByExamIdAndPosition")
      .mockImplementationOnce(() => Promise.resolve(fixture.question));

    const save = jest.spyOn(examQuestionsRepo, "save");

    await sut.execute(fixture.question, fixture.institutionId);

    expect(save).toBeCalledWith(fixture.question);
  });

  it("should check if the exam exists before upserting a new question", () => {
    const { sut, fixture } = createSut();

    const rejection = sut.execute(fixture.question, fixture.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.ExamNotFound);
  });

  it("should check if the exam position is already in use by another question", async () => {
    const { sut, examQuestionsRepo, examsRepo, fixture } = createSut();

    jest.spyOn(examsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixture.exam),
    );
    jest.spyOn(examQuestionsRepo, "findByExamIdAndPosition")
      .mockImplementationOnce(() => Promise.resolve(fixture.anotherQuestion));

    const rejection = sut.execute(fixture.question, fixture.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.PositionAlreadyInUse);
  });
});
