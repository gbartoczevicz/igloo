import { DomainError } from "~/errors";

export class ProfessorNotFound extends DomainError {
  public constructor() {
    super("Professor not found");
  }
}
