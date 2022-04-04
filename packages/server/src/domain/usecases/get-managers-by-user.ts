import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import { InstitutionManager, User } from "../entities";

export class GetManagersByUser {
  private readonly managersRepo: InstitutionManagersRepo;

  public constructor(managersRepo: InstitutionManagersRepo) {
    this.managersRepo = managersRepo;
  }

  public async execute(user: User): Promise<InstitutionManager[]> {
    return await this.managersRepo.findAllByUserId(user.id);
  }
}
