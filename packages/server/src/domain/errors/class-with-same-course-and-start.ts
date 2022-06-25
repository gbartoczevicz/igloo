import { DomainError } from "~/errors";

export class ClassCourseWithSameCourseAndStartAlreadyCreated
  extends DomainError {
  public constructor() {
    super("A class with same course at the same start date is already created");
  }
}
