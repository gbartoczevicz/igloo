import { LearningTrail } from "~/domain/entities";

export interface LearningTrailsRepo {
  save(learningTrail: LearningTrail): Promise<void>;
}
