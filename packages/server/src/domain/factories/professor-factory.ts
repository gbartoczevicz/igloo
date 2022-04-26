import { Professor } from "../entities";
import { Id } from "../entities/values";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  institutionId: Id;
  userId: Id;
};

export class ProfessorFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: Params): Professor {
    const id = this.idFactory.create(incoming.id);

    return new Professor(id, incoming.userId, incoming.institutionId);
  }
}
