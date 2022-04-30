import { Id } from "./values";

export class Discipline {
  public readonly id: Id;

  public readonly name: string;

  public readonly courseId: Id;

  public constructor(id: Id, name: string, courseId: Id) {
    this.id = id;
    this.name = name;
    this.courseId = courseId;
  }
}
