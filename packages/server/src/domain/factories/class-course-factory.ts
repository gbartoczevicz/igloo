import { ClassCourse } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  name: string;
  courseId: string;
  start: Date;
};

export class ClassCourseFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: Params): ClassCourse {
    const { name, start, ...delegate } = incoming;

    const id = this.idFactory.create(delegate.id);
    const courseId = this.idFactory.create(delegate.courseId);

    return new ClassCourse(id, courseId, name, start);
  }
}
