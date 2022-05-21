import { InstitutionManagersRepo } from "~/contracts/database/repositories";
import * as Errors from "~/domain/errors";
import { InstitutionManager, User } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
  user: User;
};

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

  public async execute(incoming: Params): Promise<InstitutionManager> {
    const institutionId = this.idFactory.create(incoming.institutionId);

    const managerFound = await this.managersRepo.findByInstitutionId(
      institutionId,
    );

    if (!managerFound) {
      throw new Errors.ManagerNotFound();
    }

    const isManager = managerFound.userId.isEqual(incoming.user.id);

    if (!isManager) {
      throw new Errors.NotAManager();
    }

    return managerFound;
  }
}
