import { DomainError } from "~/errors/domain";

namespace Errors {
  export class StepNotFound extends DomainError {
    public constructor() {
      super("Step not found");
    }
  }

  export class StepAlreadyHaveExam extends DomainError {
    public constructor() {
      super("Step already have an exam scheduled");
    }
  }
}

export default Errors;
