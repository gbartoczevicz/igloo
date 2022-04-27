import {
  InstitutionManagersRepo,
  InstitutionsRepo,
} from "~/contracts/database/repositories";
import { Institution, User } from "../entities";

type Params = {
  user: User;
};

export class GetManagedInstitutionsUseCase {
  private readonly managersRepo: InstitutionManagersRepo;

  private readonly institutionsRepo: InstitutionsRepo;

  public constructor(
    managersRepo: InstitutionManagersRepo,
    institutionsRepo: InstitutionsRepo,
  ) {
    this.managersRepo = managersRepo;
    this.institutionsRepo = institutionsRepo;
  }

  public async execute(incoming: Params): Promise<Institution[]> {
    const managersFound = await this.managersRepo.findAllByUserId(
      incoming.user.id,
    );

    const institutionsFound = await this.institutionsRepo.findAllById(
      managersFound.map((manager) => manager.id),
    );

    return institutionsFound;
  }
}
