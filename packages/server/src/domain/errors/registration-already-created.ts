import { DomainError } from "~/errors";

export class StudentClassCourseRegistrationAlreadyCreated extends DomainError {
  public constructor() {
    super("Student class course registration is already created");
  }
}

export class ProfessorClassCourseRegistrationAlreadyCreated
  extends DomainError {
  public constructor() {
    super("Professor class course registration is already created");
  }
}
