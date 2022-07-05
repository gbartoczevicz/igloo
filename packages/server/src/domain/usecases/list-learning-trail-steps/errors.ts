import { DomainError } from "~/errors/domain";

namespace Errors {
  export class TrailNotFound extends DomainError {
    public constructor() {
      super("Trail not found");
    }
  }
}

export default Errors;
