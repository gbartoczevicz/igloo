import { Professor } from "./professor";
import { Student } from "./student";
import { User } from "./user";

export class ProfessorUserComposition {
  public readonly professor: Professor;

  public readonly user: User;

  public constructor(professor: Professor, user: User) {
    this.professor = professor;
    this.user = user;
  }
}

export class StudentUserComposition {
  public readonly student: Student;

  public readonly user: User;

  public constructor(student: Student, user: User) {
    this.student = student;
    this.user = user;
  }
}
