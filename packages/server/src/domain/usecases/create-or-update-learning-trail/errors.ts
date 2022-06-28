import { DomainError } from "~/errors/domain";

namespace Errors {
  export class DisciplineNotFound extends DomainError {
    public constructor() {
      super("Discipline not found");
    }
  }
}

export default Errors;
