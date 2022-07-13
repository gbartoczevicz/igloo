import { AssertiveQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface AssertiveQuestionsRepo {
  save(question: AssertiveQuestion): Promise<void>;
  findByIdAndInstitution(
    id: Id,
    institutionId: Id,
  ): Promise<AssertiveQuestion | null>;
}
