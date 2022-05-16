import { DomainError } from "~/errors";

export class UserToBeStudentDoesNotExists extends DomainError {
  public constructor() {
    super("User to be student does not exists");
  }
}
