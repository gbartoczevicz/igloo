import { ClassCourse } from "../entities";
import { ClassStartDate } from "../entities/values";
import { IdFactory } from "./id-factory";

type Start = Date | {
  year: number;
  month: number;
};

type Params = {
  id?: string;
  name: string;
  courseId: string;
  start: Start;
};

export class ClassCourseFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(incoming: Params): ClassCourse {
    const { name, ...delegate } = incoming;

    const id = this.idFactory.create(delegate.id);
    const courseId = this.idFactory.create(delegate.courseId);
    const start = new ClassStartDate(delegate.start);

    return new ClassCourse(id, courseId, name, start);
  }
}
