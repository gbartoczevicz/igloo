import { Institution } from "./institution";
import { InstitutionManager } from "./institution-manager";
import { Professor } from "./professor";
import { Student } from "./student";
import { User } from "./user";
import { UserRole } from "./values";

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

export type UserRoleInInstitution = {
  institution: Institution;
  userRole: UserRole;
};

export class UserRelatedInstitutions {
  public readonly institutions: UserRoleInInstitution[];

  public constructor(institutions: UserRoleInInstitution[]) {
    this.institutions = institutions;
  }
}

export class UserRoles {
  public readonly manager: InstitutionManager | null;

  public readonly professor: Professor | null;

  public readonly student: Student | null;

  public constructor(
    manager: InstitutionManager | null,
    professor: Professor | null,
    student: Student | null,
  ) {
    this.manager = manager;
    this.professor = professor;
    this.student = student;
  }
}
