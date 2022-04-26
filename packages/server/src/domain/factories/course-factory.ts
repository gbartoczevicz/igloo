import { Course } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  name: string;
  institutionId: string;
};

export class CourseFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(params: Params): Course {
    const { name, ...delegate } = params;

    const id = this.idFactory.create(delegate.id);
    const institutionId = this.idFactory.create(delegate.institutionId);

    return new Course(id, name, institutionId);
  }
}
