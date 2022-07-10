import { Exam, ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { ListExamQuestionsUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      examsRepo,
      examQuestionsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new ListExamQuestionsUseCase(
      examsRepo,
      examQuestionsRepo,
    ),
    examsRepo,
    examQuestionsRepo,
    fixtures: {
      exam: new Exam(id, id),
      examQuestion: new ExamQuestion(id, 0, id),
      institutionId: id,
    },
  };
}

describe("List Institution Exams Use Case", () => {
  it("should list the expected exam questions", async () => {
    const { sut, examsRepo, examQuestionsRepo, fixtures } = createSut();

    jest.spyOn(examsRepo, "findByIdAndInstitutionId").mockImplementationOnce(
      () => Promise.resolve(fixtures.exam),
    );

    jest.spyOn(examQuestionsRepo, "findAllByExamId").mockImplementationOnce(
      () => Promise.resolve([fixtures.examQuestion]),
    );

    const result = await sut.execute(fixtures.exam.id, fixtures.institutionId);

    expect(result).toEqual([fixtures.examQuestion]);
  });

  it("should check if the exam exists", () => {
    const { sut, fixtures } = createSut();

    const rejection = sut.execute(fixtures.exam.id, fixtures.institutionId);

    expect(rejection).rejects.toBeInstanceOf(Errors.ExamNotFound);
  });
});
