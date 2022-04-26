import { AppError } from "~/contracts/errors";

export class DomainError extends AppError {
  public override toRaw(): unknown {
    return { message: this.message };
  }
}
