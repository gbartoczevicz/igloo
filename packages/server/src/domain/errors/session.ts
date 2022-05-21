import { UnauthorizedError } from "~/errors";

export class UserNotFound extends UnauthorizedError {
  public constructor() {
    super("User not found");
  }
}

export class PasswordNotMatch extends UnauthorizedError {
  public constructor() {
    super("Password does not match");
  }
}
