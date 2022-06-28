import {
  DisciplinesRepo,
  LearningTrailsRepo,
} from "~/contracts/database/repositories";
import { LearningTrail } from "~/domain/entities";

import Errors from "./errors";

export class CreateOrUpdateLearningTrailUseCase {
  public constructor(
    private readonly disciplinesRepo: DisciplinesRepo,
    private readonly learningTrailsRepo: LearningTrailsRepo,
  ) {}

  public async execute(learningTrail: LearningTrail): Promise<void> {
    const discipline = await this.disciplinesRepo.findById(
      learningTrail.disciplineId,
    );

    if (!discipline) {
      throw new Errors.DisciplineNotFound();
    }

    await this.learningTrailsRepo.save(learningTrail);
  }
}
