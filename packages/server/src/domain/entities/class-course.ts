import { ClassStartDate, Id } from "./values";

export class ClassCourse {
  public readonly id: Id;

  public readonly courseId: Id;

  public readonly name: string;

  public readonly start: ClassStartDate;

  public constructor(
    id: Id,
    courseId: Id,
    name: string,
    start: ClassStartDate,
  ) {
    this.id = id;
    this.courseId = courseId;
    this.name = name;
    this.start = start;
  }
}
