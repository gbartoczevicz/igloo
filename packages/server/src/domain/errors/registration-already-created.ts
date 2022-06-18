import { DomainError } from "~/errors";

export class StudentClassCourseRegistrationAlreadyCreated extends DomainError {
  public constructor() {
    super("Student class course registration is already created");
  }
}
