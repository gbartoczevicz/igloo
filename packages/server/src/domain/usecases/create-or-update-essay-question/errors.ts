import { DomainError } from "~/errors/domain";

namespace Errors {
  export class ExamQuestionNotFound extends DomainError {
    public constructor() {
      super("Exam Question not found");
    }
  }
}

export default Errors;
