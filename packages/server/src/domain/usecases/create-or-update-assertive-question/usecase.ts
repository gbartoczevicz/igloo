import {
  AssertiveQuestionsRepo,
  ExamQuestionsRepo,
} from "~/contracts/database/repositories";
import { AssertiveQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

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
      throw new Errors.ExamQuestionNotFound();
    }

    await this.assertiveQuestionsRepo.save(question);
  }
}
