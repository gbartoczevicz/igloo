import { Discipline } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  name: string;
  courseId: string;
};

export class DisciplineFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(params: Params): Discipline {
    const { name, ...delegate } = params;

    const id = this.idFactory.create(delegate.id);
    const courseId = this.idFactory.create(delegate.courseId);

    return new Discipline(id, name, courseId);
  }
}
