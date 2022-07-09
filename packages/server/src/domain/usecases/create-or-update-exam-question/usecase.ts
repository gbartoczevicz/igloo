import {
  ExamQuestionsRepo,
  ExamsRepo,
} from "~/contracts/database/repositories";
import { ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class CreateOrUpdateExamQuestionUseCase {
  public constructor(
    private readonly examQuestionsRepo: ExamQuestionsRepo,
    private readonly examsRepo: ExamsRepo,
  ) {}

  public async execute(
    question: ExamQuestion,
    institutionId: Id,
  ): Promise<void> {
    const exam = await this.examsRepo.findByIdAndInstitutionId(
      question.examId,
      institutionId,
    );

    if (!exam) {
      throw new Errors.ExamNotFound();
    }

    const questionFound = await this.examQuestionsRepo
      .findByExamIdAndPosition(
        question.examId,
        question.position,
      );

    if (questionFound && !questionFound.id.isEqual(question.id)) {
      throw new Errors.PositionAlreadyInUse();
    }

    await this.examQuestionsRepo.save(question);
  }
}
