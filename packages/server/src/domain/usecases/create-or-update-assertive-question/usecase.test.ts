import { AssertiveQuestion, ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateAssertiveQuestionUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examQuestionsRepo,
      assertiveQuestionsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateOrUpdateAssertiveQuestionUseCase(
      examQuestionsRepo,
      assertiveQuestionsRepo,
    ),
    examQuestionsRepo,
    assertiveQuestionsRepo,
    fixtures: {
      examQuestion: new ExamQuestion(id, 0, id),
      assertiveQuestion: new AssertiveQuestion(id, id, "any", "any", true),
      institutionId: id,
    },
  };
}

describe("Create Or Update Assertive Question Use Case", () => {
  it("should upsert a question when the exam question exists", async () => {
    const { sut, assertiveQuestionsRepo, examQuestionsRepo, fixtures } =
      createSut();

    jest.spyOn(examQuestionsRepo, "findByIdAndInstitutionId")
      .mockImplementationOnce(() => Promise.resolve(fixtures.examQuestion));

    const save = jest.spyOn(assertiveQuestionsRepo, "save");

    await sut.execute(fixtures.assertiveQuestion, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.assertiveQuestion);
  });

  it("should check if the exam question exists before upserting a new question", () => {
    const { sut, fixtures } = createSut();

    const rejection = sut.execute(
      fixtures.assertiveQuestion,
      fixtures.institutionId,
    );

    expect(rejection).rejects.toBeInstanceOf(Errors.ExamQuestionNotFound);
  });
});
