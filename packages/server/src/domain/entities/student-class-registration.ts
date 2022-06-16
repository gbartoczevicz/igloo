import { Id } from "./values";

export class StudentClassRegistration {
  public readonly id: Id;

  public readonly studentId: Id;

  public readonly classCourseId: Id;

  public constructor(id: Id, studentId: Id, classCourseId: Id) {
    this.id = id;
    this.classCourseId = classCourseId;
    this.studentId = studentId;
  }
}
