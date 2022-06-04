import { DomainError } from "~/errors";

export class CourseNotExists extends DomainError {
  public constructor() {
    super("The course does not exists");
  }
}
