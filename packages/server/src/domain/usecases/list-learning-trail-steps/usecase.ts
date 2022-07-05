import {
  LearningTrailsRepo,
  LearningTrailStepsRepo,
} from "~/contracts/database/repositories";
import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class ListLearningTrailStepsUseCase {
  public constructor(
    private readonly learningTrailsRepo: LearningTrailsRepo,
    private readonly learningTrailStepsRepo: LearningTrailStepsRepo,
  ) {}

  public async execute(
    learningTrailId: Id,
    institutionId: Id,
  ): Promise<LearningTrailStep[]> {
    const trailFound = await this.learningTrailsRepo.findByIdAndInstitutionId(
      learningTrailId,
      institutionId,
    );

    if (!trailFound) {
      throw new Errors.TrailNotFound();
    }

    return await this.learningTrailStepsRepo.findAllByLearningTrailId(
      learningTrailId,
    );
  }
}
