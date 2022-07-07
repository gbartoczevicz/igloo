import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface LearningTrailStepsRepo {
  save(step: LearningTrailStep): Promise<void>;
  findByLearningTrailIdAndPosition(
    learningTrailId: Id,
    position: number,
  ): Promise<LearningTrailStep | null>;
  findAllByLearningTrailId(learningTrailId: Id): Promise<LearningTrailStep[]>;
  findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<LearningTrailStep | null>;
}
