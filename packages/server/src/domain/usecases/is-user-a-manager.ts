import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";

export class IsUserAManagerUseCase {
  private readonly managersRepo: InstitutionManagersRepo;

  public constructor(managersRepo: InstitutionManagersRepo) {
    this.managersRepo = managersRepo;
  }

  public async execute(user: User): Promise<boolean> {
    const managersFound = await this.managersRepo.findAllByUserId(user.id);

    return managersFound.length > 0;
  }
}
