import { DomainError } from "~/errors";

export class InstitutionAlreadyHaveManager extends DomainError {
  public constructor() {
    super("The institution already have a manager");
  }
}
