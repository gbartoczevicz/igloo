import { Factory } from "~/contracts/domain";
import { Student } from "../entities";
import { Id } from "../entities/values";
import { IdFactory } from "./id-factory";

type FactoryParams = {
  institutionId: Id;
  userId: Id;
};

export class StudentFactory implements Factory<FactoryParams, Student> {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: FactoryParams): Student {
    const id = this.idFactory.create();

    const { institutionId, userId } = incoming;

    return new Student(id, userId, institutionId);
  }
}
