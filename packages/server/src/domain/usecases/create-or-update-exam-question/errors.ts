import { DomainError } from "~/errors/domain";

namespace Errors {
  export class PositionAlreadyInUse extends DomainError {
    public constructor() {
      super("The exam position is already in use");
    }
  }
  export class ExamNotFound extends DomainError {
    public constructor() {
      super("Exam not found");
    }
  }
}

export default Errors;
