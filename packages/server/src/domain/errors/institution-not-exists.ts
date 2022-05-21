import { DomainError } from "~/errors";

export class InstitutionNotExists extends DomainError {
  public constructor() {
    super("The institution does not exists");
  }
}
