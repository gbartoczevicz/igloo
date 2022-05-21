import { DomainError } from "~/errors";

export class DisciplineNameAlreadyInUse extends DomainError {
  public constructor() {
    super("The discipline name is already in use");
  }
}
