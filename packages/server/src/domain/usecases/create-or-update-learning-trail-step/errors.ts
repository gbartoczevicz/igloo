import { DomainError } from "~/errors/domain";

namespace Errors {
  export class PositionAlreadyInUse extends DomainError {
    public constructor() {
      super("The learning trail position is already in use");
    }
  }
}

export default Errors;
