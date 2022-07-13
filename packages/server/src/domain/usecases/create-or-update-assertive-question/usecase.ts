import {
  AssertiveQuestionsRepo,
  ExamQuestionsRepo,
} from "~/contracts/database/repositories";
import { AssertiveQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export class CreateOrUpdateAssertiveQuestionUseCase {
  public constructor(
    private readonly examQuestionsRepo: ExamQuestionsRepo,
    private readonly assertiveQuestionsRepo: AssertiveQuestionsRepo,
  ) {}

  public async execute(question: AssertiveQuestion, institutionId: Id) {
    const examQuestion = await this.examQuestionsRepo.findByIdAndInstitutionId(
      question.id,
      institutionId,
    );

    if (!examQuestion) {
      throw new Error("Exam question not found");
    }

    await this.assertiveQuestionsRepo.save(question);
  }
}
