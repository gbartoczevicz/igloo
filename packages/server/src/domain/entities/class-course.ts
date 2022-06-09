import { Id } from "./values";

export class ClassCourse {
  public readonly id: Id;

  public readonly courseId: Id;

  public readonly name: string;

  public readonly start: Date;

  public constructor(id: Id, courseId: Id, name: string, start: Date) {
    this.id = id;
    this.courseId = courseId;
    this.name = name;
    this.start = start;
  }
}
