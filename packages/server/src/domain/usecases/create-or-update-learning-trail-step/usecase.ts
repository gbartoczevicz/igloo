import { LearningTrailStepsRepo } from "~/contracts/database/repositories";
import { LearningTrailStep } from "~/domain/entities";
import Errors from "./errors";

export class CreateOrUpdateLearningTrailStepUseCase {
  public constructor(
    private readonly learningTrailStepsRepo: LearningTrailStepsRepo,
  ) {}

  public async execute(step: LearningTrailStep): Promise<void> {
    const stepFound = await this.learningTrailStepsRepo
      .findByLearningTrailIdAndPosition(step.learningTrailId, step.position);

    if (stepFound && !stepFound.id.isEqual(step.id)) {
      throw new Errors.PositionAlreadyInUse();
    }

    await this.learningTrailStepsRepo.save(step);
  }
}
