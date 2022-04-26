import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";

type Params = {
  user: User;
};

export class IsUserAManagerUseCase {
  private readonly managersRepo: InstitutionManagersRepo;

  public constructor(managersRepo: InstitutionManagersRepo) {
    this.managersRepo = managersRepo;
  }

  public async execute(incoming: Params): Promise<boolean> {
    const managersFound = await this.managersRepo.findAllByUserId(
      incoming.user.id,
    );

    return managersFound.length > 0;
  }
}
