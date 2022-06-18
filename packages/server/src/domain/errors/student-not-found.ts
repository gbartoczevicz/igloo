import { DomainError } from "~/errors";

export class StudentNotFound extends DomainError {
  public constructor() {
    super("Student not found");
  }
}
