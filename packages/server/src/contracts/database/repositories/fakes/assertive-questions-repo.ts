import { AssertiveQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { AssertiveQuestionsRepo } from "../assertive-questions-repo";

export class FakeAssertiveQuestionsRepo implements AssertiveQuestionsRepo {
  public async save(_question: AssertiveQuestion): Promise<void> {
    return Promise.resolve();
  }

  public async findByIdAndInstitution(
    _id: Id,
    _institutionId: Id,
  ): Promise<AssertiveQuestion | null> {
    return Promise.resolve(null);
  }
}
