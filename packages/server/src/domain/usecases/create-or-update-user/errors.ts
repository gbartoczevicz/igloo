import { DomainError } from "~/errors";

namespace Errors {
  export class EmailAlreadyInUse extends DomainError {
    public constructor() {
      super("E-mail is already in use");
    }
  }

  export class PhoneAlreadyInUse extends DomainError {
    public constructor() {
      super("Phone is already in use");
    }
  }
}

export = Errors;
