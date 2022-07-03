import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface LearningTrailsRepo {
  save(learningTrail: LearningTrail): Promise<void>;
  findAllByInstitutionId(institutionId: Id): Promise<LearningTrail[]>;
}
