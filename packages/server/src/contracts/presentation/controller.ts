import { DomainError } from "~/errors";
import { OnDomainError, OnInternalError } from "./listeners";

export abstract class Controller<T> {
  private readonly onDomainError: OnDomainError;

  private readonly onInternalError: OnInternalError;

  public constructor(
    onInternalError: OnInternalError,
    onDomainError: OnDomainError,
  ) {
    this.onDomainError = onDomainError;
    this.onInternalError = onInternalError;
  }

  protected abstract handle(incoming: T): Promise<void>;

  public execute(incoming: T): void {
    this.handle(incoming).catch((err) => {
      console.warn(err);

      if (err instanceof DomainError) {
        return this.onDomainError(err);
      }

      if (err instanceof Error) {
        return this.onInternalError(err);
      }

      return this.onInternalError(new Error("Unmapped error occurred"));
    });
  }
}
