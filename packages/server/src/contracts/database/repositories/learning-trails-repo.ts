import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface LearningTrailsRepo {
  save(learningTrail: LearningTrail): Promise<void>;
  findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<LearningTrail | null>;
  findAllByInstitutionId(institutionId: Id): Promise<LearningTrail[]>;
}
