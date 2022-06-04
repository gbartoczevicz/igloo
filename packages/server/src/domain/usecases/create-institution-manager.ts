import {
  InstitutionManagersRepo,
  InstitutionsRepo,
} from "~/contracts/database/repositories";
import * as Errors from "~/domain/errors";
import { Institution, InstitutionManager, User } from "../entities";
import { InstitutionManagerFactory } from "../factories";

type Params = {
  user: User;
  institution: Institution;
};

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

  public async execute(incoming: Params): Promise<InstitutionManager> {
    const { institution, user } = incoming;

    const doesInstitutionExists = await this.institutionsRepo.findById(
      institution.id,
    );

    if (!doesInstitutionExists) {
      throw new Errors.InstitutionNotExists();
    }

    const alreadyHaveAManager = await this.institutionManagersRepo
      .findByInstitutionId(institution.id);

    if (alreadyHaveAManager) {
      throw new Errors.InstitutionAlreadyHaveManager();
    }

    const manager = this.managerFactory.create({
      institution: doesInstitutionExists,
      user,
    });

    await this.institutionManagersRepo.save(manager);

    return manager;
  }
}
