import {
  InstitutionManagersRepo,
  InstitutionsRepo,
} from "~/contracts/database/repositories";
import { DomainError } from "~/errors";
import { Institution, InstitutionManager, User } from "../entities";

export class CreateInstitutionManagerUseCase {
  private readonly institutionManagersRepo: InstitutionManagersRepo;

  private readonly institutionsRepo: InstitutionsRepo;

  public constructor(
    institutionManagersRepo: InstitutionManagersRepo,
    institutionsRepo: InstitutionsRepo,
  ) {
    this.institutionManagersRepo = institutionManagersRepo;
    this.institutionsRepo = institutionsRepo;
  }

  public async execute(
    user: User,
    institution: Institution,
  ): Promise<InstitutionManager> {
    const doesInstitutionExists = await this.institutionsRepo.findById(
      institution.id,
    );

    if (!doesInstitutionExists) {
      throw new DomainError("The institution does not exists");
    }

    const alreadyHaveAManager = await this.institutionManagersRepo
      .findByInstitutionId(institution.id);

    if (alreadyHaveAManager) {
      throw new DomainError("The institution already have a manager");
    }

    const manager = new InstitutionManager(user.id, institution.id);

    await this.institutionManagersRepo.save(manager);

    return manager;
  }
}
