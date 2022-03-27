import { Factory } from "~/contracts/domain";
import { Professor } from "../entities";
import { Id } from "../entities/values";
import { IdFactory } from "./id-factory";

type FactoryParams = {
  institutionId: Id;
  userId: Id;
};

export class ProfessorFactory implements Factory<FactoryParams, Professor> {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: FactoryParams): Professor {
    const id = this.idFactory.create();

    const { institutionId, userId } = incoming;

    return new Professor(id, userId, institutionId);
  }
}
