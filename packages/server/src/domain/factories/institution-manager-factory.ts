import { Factory } from "~/contracts/domain";
import { Institution, InstitutionManager, User } from "../entities";
import { IdFactory } from "./id-factory";

type FactoryParams = {
  institution: Institution;
  user: User;
};

export class InstitutionManagerFactory
  implements Factory<FactoryParams, InstitutionManager> {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: FactoryParams): InstitutionManager {
    const id = this.idFactory.create();

    const { institution, user } = incoming;

    return new InstitutionManager(id, user.id, institution.id);
  }
}
