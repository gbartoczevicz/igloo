import { Student } from "../entities";
import { Id } from "../entities/values";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  institutionId: Id;
  userId: Id;
};

export class StudentFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: Params): Student {
    const id = this.idFactory.create(incoming.id);

    return new Student(id, incoming.userId, incoming.institutionId);
  }
}
