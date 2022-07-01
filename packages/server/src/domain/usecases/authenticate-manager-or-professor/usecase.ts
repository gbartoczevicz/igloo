import {
  InstitutionManagersRepo,
  ProfessorsRepo,
} from "~/contracts/database/repositories";
import { InstitutionManager, Professor, User } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

import Errors from "./errors";

type Params = {
  user: User;
  institutionId: Id;
};

export class AuthenticateManagerOrProfessorUseCase {
  public constructor(
    private readonly professorsRepo: ProfessorsRepo,
    private readonly managersRepo: InstitutionManagersRepo,
  ) {}

  public async execute(
    params: Params,
  ): Promise<InstitutionManager | Professor> {
    const { institutionId, user } = params;

    const professor = await this.professorsRepo.findByInstitutionAndUser(
      institutionId,
      user.id,
    );

    if (professor) {
      return professor;
    }

    const manager = await this.managersRepo.findByInstitutionAndUser(
      institutionId,
      user.id,
    );

    if (manager) {
      return manager;
    }

    throw new Errors.NeitherProfessorOrManager();
  }
}
