import { ForbiddenError } from "~/errors/authentication";

namespace Errors {
  export class NeitherProfessorOrManager extends ForbiddenError {
    public constructor() {
      super("Neither professor or manager");
    }
  }
}

export default Errors;
