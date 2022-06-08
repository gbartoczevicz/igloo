import { DomainError } from "~/errors";

export class UserToBeProfessorIsAlreadyAManager extends DomainError {
  public constructor() {
    super("The current user to be professor is already a manager");
  }
}
