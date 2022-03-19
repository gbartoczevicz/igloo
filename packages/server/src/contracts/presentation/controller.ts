import { DomainError } from "~/errors";
import { HttpStatus } from "../http";
import { ErrorPayload, Result } from "./result";

export abstract class Controller<T, U> {
  protected abstract handle(incoming: T): Promise<Result<U>>;

  public async execute(incoming: T): Promise<Result<U | ErrorPayload>> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.handleOnGeneralError(err));
  }

  protected onCreated(content: U): Result<U> {
    return { content, status: HttpStatus.created };
  }

  protected onDomainError(content: DomainError): Result<ErrorPayload> {
    return {
      content: { message: content.message },
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: Error): Result<ErrorPayload> {
    return {
      content: { message: content.message },
      status: HttpStatus.internalError,
    };
  }

  private handleOnGeneralError(err: unknown): Result<ErrorPayload> {
    console.warn(err);

    if (err instanceof DomainError) {
      return this.onDomainError(err);
    }

    if (err instanceof Error) {
      return this.onInternalError(err);
    }

    return this.onInternalError(new Error("Unmapped error occurred"));
  }
}
