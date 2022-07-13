import { AssertiveQuestionOption } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { AssertiveQuestionOptionsRepo } from "../assertive-question-options-repo";

export class FakeAssertiveQuestionOptionsRepo
  implements AssertiveQuestionOptionsRepo {
  public async save(_question: AssertiveQuestionOption): Promise<void> {
    return Promise.resolve();
  }

  public async findByPositionAndAssertiveQuestionId(
    _position: number,
    _questionId: Id,
  ): Promise<AssertiveQuestionOption | null> {
    return Promise.resolve(null);
  }
}
