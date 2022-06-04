import { DomainError } from "~/errors";

export class PhoneAlreadyInUse extends DomainError {
  public constructor() {
    super("Phone is already in use");
  }
}
