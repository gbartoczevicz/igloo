import { DomainError } from "~/errors";

export class CourseNameAlreadyInUse extends DomainError {
  public constructor() {
    super("The discipline name is already in use");
  }
}
