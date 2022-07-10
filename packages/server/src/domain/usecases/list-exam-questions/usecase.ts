import {
  ExamQuestionsRepo,
  ExamsRepo,
} from "~/contracts/database/repositories";
import { ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class ListExamQuestionsUseCase {
  public constructor(
    private readonly examsRepo: ExamsRepo,
    private readonly examQuestionsRepo: ExamQuestionsRepo,
  ) {}

  public async execute(examId: Id, institutionId: Id): Promise<ExamQuestion[]> {
    const examFound = await this.examsRepo.findByIdAndInstitutionId(
      examId,
      institutionId,
    );

    if (!examFound) {
      throw new Errors.ExamNotFound();
    }

    return await this.examQuestionsRepo.findAllByExamId(examId);
  }
}
