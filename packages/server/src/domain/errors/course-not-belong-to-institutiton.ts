import { DomainError } from "~/errors";

export class CourseNotBelongToInstitution extends DomainError {
  public constructor() {
    super("The course doesn't belong to the institution");
  }
}
