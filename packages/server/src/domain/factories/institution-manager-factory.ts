import { Institution, InstitutionManager, User } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  institution: Institution;
  user: User;
};

export class InstitutionManagerFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: Params): InstitutionManager {
    const id = this.idFactory.create(incoming.id);

    return new InstitutionManager(
      id,
      incoming.user.id,
      incoming.institution.id,
    );
  }
}
