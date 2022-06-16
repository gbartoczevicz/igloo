import { Id } from "./values";

export class StudentClassRegistration {
  public readonly studentId: Id;

  public readonly classCourseId: Id;

  public constructor(studentId: Id, classCourseId: Id) {
    this.classCourseId = classCourseId;
    this.studentId = studentId;
  }
}
