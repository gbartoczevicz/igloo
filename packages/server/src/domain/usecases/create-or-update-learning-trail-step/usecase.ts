import {
  LearningTrailsRepo,
  LearningTrailStepsRepo,
} from "~/contracts/database/repositories";
import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class CreateOrUpdateLearningTrailStepUseCase {
  public constructor(
    private readonly learningTrailsRepo: LearningTrailsRepo,
    private readonly learningTrailStepsRepo: LearningTrailStepsRepo,
  ) {}

  public async execute(
    step: LearningTrailStep,
    institutionId: Id,
  ): Promise<void> {
    const trailFound = await this.learningTrailsRepo.findByIdAndInstitutionId(
      step.learningTrailId,
      institutionId,
    );

    if (!trailFound) {
      throw new Errors.TrailNotFound();
    }

    const stepFound = await this.learningTrailStepsRepo
      .findByLearningTrailIdAndPosition(step.learningTrailId, step.position);

    if (stepFound && !stepFound.id.isEqual(step.id)) {
      throw new Errors.PositionAlreadyInUse();
    }

    await this.learningTrailStepsRepo.save(step);
  }
}
