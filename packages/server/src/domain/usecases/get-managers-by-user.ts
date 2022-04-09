import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import { InstitutionManager, User } from "../entities";

export class GetManagersByUserUseCase {
  private readonly managersRepo: InstitutionManagersRepo;

  public constructor(managersRepo: InstitutionManagersRepo) {
    this.managersRepo = managersRepo;
  }

  public async execute(user: User): Promise<InstitutionManager[]> {
    return await this.managersRepo.findAllByUserId(user.id);
  }
}
