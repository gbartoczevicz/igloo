import { AppError } from "~/contracts/errors";

export class UnauthorizedError extends AppError {
  public override toRaw(): unknown {
    return undefined;
  }
}

export class ForbiddenError extends AppError {
  public override toRaw(): unknown {
    return undefined;
  }
}
