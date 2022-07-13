import { AssertiveQuestionOption } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface AssertiveQuestionOptionsRepo {
  save(question: AssertiveQuestionOption): Promise<void>;
  findByPositionAndAssertiveQuestionId(
    position: number,
    questionId: Id,
  ): Promise<AssertiveQuestionOption | null>;
}
