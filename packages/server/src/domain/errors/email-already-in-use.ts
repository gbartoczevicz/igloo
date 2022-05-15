import { DomainError } from "~/errors";

export class EmailAlreadyInUse extends DomainError {
  public constructor() {
    super("E-mail is already in use");
  }
}
