import { Id } from "./values";

export class ProfessorClassRegistration {
  public readonly id: Id;

  public readonly professorId: Id;

  public readonly classCourseId: Id;

  public constructor(id: Id, professorId: Id, classCourseId: Id) {
    this.id = id;
    this.classCourseId = classCourseId;
    this.professorId = professorId;
  }
}
