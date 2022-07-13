import { DomainError } from "~/errors/domain";

namespace Errors {
  export class AssertiveQuestionNotFound extends DomainError {
    public constructor() {
      super("Assertive Question not found");
    }
  }

  export class FeedbackIsMissing extends DomainError {
    public constructor() {
      super("The option feedback is missing");
    }
  }

  export class HaveFeedback extends DomainError {
    public constructor() {
      super("The option should not have a feedback");
    }
  }

  export class PositionIsAlreadyInUse extends DomainError {
    public constructor() {
      super("The position is already in use");
    }
  }
}

export default Errors;
