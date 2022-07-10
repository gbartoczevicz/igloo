import { ExamsRepo } from "~/contracts/database/repositories";
import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export class ListInstitutionExamsUseCase {
  public constructor(
    private readonly examsRepo: ExamsRepo,
  ) {}

  public async execute(institutionId: Id): Promise<Exam[]> {
    return await this.examsRepo.findAllByInstitutionId(institutionId);
  }
}
