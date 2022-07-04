import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { LearningTrailStepsRepo } from "~/contracts/database/repositories";

export class FakeLearningTrailStepsRepo implements LearningTrailStepsRepo {
  public async save(_step: LearningTrailStep): Promise<void> {
    return Promise.resolve();
  }

  public async findByLearningTrailIdAndPosition(
    _learningTrailId: Id,
    _position: number,
  ): Promise<LearningTrailStep | null> {
    return Promise.resolve(null);
  }
}
