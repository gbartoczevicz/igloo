import { ForbiddenError } from "~/errors";

export class ManagerNotFound extends ForbiddenError {
  public constructor() {
    super("Manager not found");
  }
}

export class NotAManager extends ForbiddenError {
  public constructor() {
    super("Current user is not the manager");
  }
}
