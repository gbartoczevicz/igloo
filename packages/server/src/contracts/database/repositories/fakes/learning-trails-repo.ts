import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { LearningTrailsRepo } from "../learning-trails-repo";

export class FakeLearningTrailsRepo implements LearningTrailsRepo {
  public async save(_learningTrail: LearningTrail): Promise<void> {
    return Promise.resolve();
  }

  public async findAllByInstitutionId(
    _institutionId: Id,
  ): Promise<LearningTrail[]> {
    return Promise.resolve([]);
  }

  public async findByIdAndInstitutionId(
    _id: Id,
    _institutionId: Id,
  ): Promise<LearningTrail | null> {
    return Promise.resolve(null);
  }
}
