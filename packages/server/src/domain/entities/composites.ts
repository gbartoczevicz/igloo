import { Professor } from "./professor";
import { User } from "./user";

export class ProfessorUserComposition {
  public readonly professor: Professor;

  public readonly user: User;

  public constructor(professor: Professor, user: User) {
    this.professor = professor;
    this.user = user;
  }
}
