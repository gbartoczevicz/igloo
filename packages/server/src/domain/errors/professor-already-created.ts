import { DomainError } from "~/errors";

export class ProfessorAlreadyCreated extends DomainError {
  public constructor() {
    super("The professor is already created in this institution");
  }
}
