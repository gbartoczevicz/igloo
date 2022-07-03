import { LearningTrailsRepo } from "~/contracts/database/repositories";
import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export class ListInstitutionLearningTrailsUseCase {
  public constructor(
    private readonly learningTrailsRepo: LearningTrailsRepo,
  ) {}

  public async execute(institutionId: Id): Promise<LearningTrail[]> {
    return await this.learningTrailsRepo.findAllByInstitutionId(institutionId);
  }
}
