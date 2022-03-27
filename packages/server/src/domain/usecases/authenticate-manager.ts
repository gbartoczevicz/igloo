import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import { AuthenticateManagerIn } from "~/dtos";
import { AuthenticationError } from "~/errors";
import { InstitutionManager } from "../entities";
import { IdFactory } from "../factories";

export class AuthenticateManagerUseCase {
  private readonly idFactory: IdFactory;

  private readonly managersRepo: InstitutionManagersRepo;

  public constructor(
    idFactory: IdFactory,
    managersRepo: InstitutionManagersRepo,
  ) {
    this.idFactory = idFactory;
    this.managersRepo = managersRepo;
  }

  public async execute(
    incoming: AuthenticateManagerIn,
  ): Promise<InstitutionManager> {
    const institutionId = this.idFactory.create(incoming.institutionId);

    const managerFound = await this.managersRepo.findByInstitutionId(
      institutionId,
    );

    if (!managerFound) {
      throw new AuthenticationError("Manager not found");
    }

    const isManager = managerFound.userId.isEqual(incoming.user.id);

    if (!isManager) {
      throw new AuthenticationError("Current user is not the manager");
    }

    return managerFound;
  }
}
