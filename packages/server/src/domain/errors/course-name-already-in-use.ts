import { DomainError } from "~/errors";

export class CourseNameAlreadyInUse extends DomainError {
  public constructor() {
    super("The course name is already in use");
  }
}
