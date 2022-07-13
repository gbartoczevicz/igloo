import {
  EssayQuestionsRepo,
  ExamQuestionsRepo,
} from "~/contracts/database/repositories";
import { EssayQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class CreateOrUpdateEssayQuestionUseCase {
  public constructor(
    private readonly examQuestionsRepo: ExamQuestionsRepo,
    private readonly essayQuestionsRepo: EssayQuestionsRepo,
  ) {}

  public async execute(question: EssayQuestion, institutionId: Id) {
    const examQuestion = await this.examQuestionsRepo.findByIdAndInstitutionId(
      question.id,
      institutionId,
    );

    if (!examQuestion) {
      throw new Errors.ExamQuestionNotFound();
    }

    await this.essayQuestionsRepo.save(question);
  }
}
