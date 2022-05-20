import { DomainError } from "~/errors";

export class CnpjAlreadyInUse extends DomainError {
  public constructor() {
    super("Cnpj is already in use");
  }
}
