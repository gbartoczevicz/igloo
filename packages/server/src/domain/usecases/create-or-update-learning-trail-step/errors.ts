import { DomainError } from "~/errors/domain";

namespace Errors {
  export class PositionAlreadyInUse extends DomainError {
    public constructor() {
      super("The learning trail position is already in use");
    }
  }
  export class TrailNotFound extends DomainError {
    public constructor() {
      super("Trail not found");
    }
  }
}

export default Errors;
