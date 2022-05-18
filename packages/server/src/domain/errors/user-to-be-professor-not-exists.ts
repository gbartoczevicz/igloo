import { DomainError } from "~/errors";

export class UserToBeProfessorDoesNotExists extends DomainError {
  public constructor() {
    super("User to be professor does not exists");
  }
}
