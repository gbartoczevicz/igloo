import { InstitutionsRepo } from "~/contracts/database/repositories";
import { Institution, InstitutionManager } from "../entities";

type Params = {
  manager: InstitutionManager;
};

export class GetManagedInstitutionUseCase {
  private readonly institutionsRepo: InstitutionsRepo;

  public constructor(
    institutionsRepo: InstitutionsRepo,
  ) {
    this.institutionsRepo = institutionsRepo;
  }

  public async execute(incoming: Params): Promise<Institution | null> {
    const institutionsFound = await this.institutionsRepo.findById(
      incoming.manager.institutionId,
    );

    return institutionsFound;
  }
}
