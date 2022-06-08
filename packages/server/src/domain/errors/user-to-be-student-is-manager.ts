import { DomainError } from "~/errors";

export class UserToBeStudentIsAlreadyAManager extends DomainError {
  public constructor() {
    super("The current user to be student is already a manager");
  }
}
