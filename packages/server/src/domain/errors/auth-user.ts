import { UnauthorizedError } from "~/errors";

export class InvalidToken extends UnauthorizedError {
  public constructor() {
    super("Invalid bearer token");
  }
}

export class ErrorWhenDecoding extends UnauthorizedError {
  public constructor() {
    super("Error when decoding token");
  }
}

export class UserNotFound extends UnauthorizedError {
  public constructor() {
    super("User not found");
  }
}
