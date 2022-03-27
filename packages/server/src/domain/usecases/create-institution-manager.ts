import {
  InstitutionManagersRepo,
  InstitutionsRepo,
} from "~/contracts/database/repositories";
import { DomainError } from "~/errors";
import { Institution, InstitutionManager, User } from "../entities";
import { InstitutionManagerFactory } from "../factories";

export class CreateInstitutionManagerUseCase {
  private readonly institutionManagersRepo: InstitutionManagersRepo;

  private readonly institutionsRepo: InstitutionsRepo;

  private readonly managerFactory: InstitutionManagerFactory;

  public constructor(
    institutionManagersRepo: InstitutionManagersRepo,
    institutionsRepo: InstitutionsRepo,
    managerFactory: InstitutionManagerFactory,
  ) {
    this.institutionManagersRepo = institutionManagersRepo;
    this.institutionsRepo = institutionsRepo;
    this.managerFactory = managerFactory;
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

    const manager = this.managerFactory.create({
      institution: doesInstitutionExists,
      user,
    });

    await this.institutionManagersRepo.save(manager);

    return manager;
  }
}
