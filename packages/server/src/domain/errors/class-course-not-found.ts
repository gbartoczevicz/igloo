import { DomainError } from "~/errors";

export class ClassCourseNotFound extends DomainError {
  public constructor() {
    super("Class course not found");
  }
}
