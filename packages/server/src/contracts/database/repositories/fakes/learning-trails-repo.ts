import { LearningTrail } from "~/domain/entities";
import { LearningTrailRepo } from "../learning-trails-repo";

export class FakeLearningTrailsRepo implements LearningTrailRepo {
  public async save(_learningTrail: LearningTrail): Promise<void> {
    return Promise.resolve();
  }
}
