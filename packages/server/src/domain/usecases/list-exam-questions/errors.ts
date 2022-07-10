import { DomainError } from "~/errors/domain";

namespace Errors {
  export class ExamNotFound extends DomainError {
    public constructor() {
      super("Exam not found");
    }
  }
}

export default Errors;
