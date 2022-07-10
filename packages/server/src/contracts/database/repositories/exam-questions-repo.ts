import { ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ExamQuestionsRepo {
  save(question: ExamQuestion): Promise<void>;
  findByExamIdAndPosition(
    examId: Id,
    position: number,
  ): Promise<ExamQuestion | null>;
  findAllByExamId(examId: Id): Promise<ExamQuestion[]>;
}
