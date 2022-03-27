import { Factory } from "~/contracts/domain";
import { Institution, Professor, User } from "../entities";
import { IdFactory } from "./id-factory";

type FactoryParams = {
  institution: Institution;
  user: User;
};

export class ProfessorFactory implements Factory<FactoryParams, Professor> {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: FactoryParams): Professor {
    const id = this.idFactory.create();

    const { institution, user } = incoming;

    return new Professor(id, user.id, institution.id);
  }
}
