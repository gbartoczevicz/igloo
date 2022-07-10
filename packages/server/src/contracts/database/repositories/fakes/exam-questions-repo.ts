import { ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { ExamQuestionsRepo } from "../exam-questions-repo";

export class FakeExamQuestionsRepo implements ExamQuestionsRepo {
  public async save(_question: ExamQuestion): Promise<void> {
    return Promise.resolve();
  }

  public async findByExamIdAndPosition(
    _examId: Id,
    _position: number,
  ): Promise<ExamQuestion | null> {
    return Promise.resolve(null);
  }

  public async findAllByExamId(_examId: Id): Promise<ExamQuestion[]> {
    return Promise.resolve([]);
  }
}
