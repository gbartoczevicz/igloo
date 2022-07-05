import {
  DisciplinesRepo,
  LearningTrailsRepo,
} from "~/contracts/database/repositories";
import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

import Errors from "./errors";

export class CreateOrUpdateLearningTrailUseCase {
  public constructor(
    private readonly disciplinesRepo: DisciplinesRepo,
    private readonly learningTrailsRepo: LearningTrailsRepo,
  ) {}

  public async execute(
    learningTrail: LearningTrail,
    institutionId: Id,
  ): Promise<void> {
    const discipline = await this.disciplinesRepo.findByIdAndInstitutionId(
      learningTrail.disciplineId,
      institutionId,
    );

    if (!discipline) {
      throw new Errors.DisciplineNotFound();
    }

    await this.learningTrailsRepo.save(learningTrail);
  }
}
