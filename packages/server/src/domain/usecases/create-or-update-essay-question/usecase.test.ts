import { EssayQuestion, ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateEssayQuestionUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examQuestionsRepo,
      essayQuestionsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateOrUpdateEssayQuestionUseCase(
      examQuestionsRepo,
      essayQuestionsRepo,
    ),
    examQuestionsRepo,
    essayQuestionsRepo,
    fixtures: {
      examQuestion: new ExamQuestion(id, 0, id),
      essayQuestion: new EssayQuestion(id, id, "any", "any"),
      institutionId: id,
    },
  };
}

describe("Create Or Update Essay Question Use Case", () => {
  it("should upsert a question when the exam question exists", async () => {
    const { sut, essayQuestionsRepo, examQuestionsRepo, fixtures } =
      createSut();

    jest.spyOn(examQuestionsRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(() => Promise.resolve(fixtures.examQuestion));

    const save = jest.spyOn(essayQuestionsRepo, "save");

    await sut.execute(fixtures.essayQuestion, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.essayQuestion);
  });

  it("should check if the exam question exists before upserting a new question", () => {
    const { sut, fixtures } = createSut();

    const rejection = sut.execute(
      fixtures.essayQuestion,
      fixtures.institutionId,
    );

    expect(rejection).rejects.toBeInstanceOf(Errors.ExamQuestionNotFound);
  });
});
