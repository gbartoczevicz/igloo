import { DomainError } from "~/errors";
import { OutDTO } from "../dtos";
import { HttpStatus } from "../http";
import { ErrorPayload, Result } from "./result";

export abstract class Controller<T, U> {
  protected abstract handle(incoming: T): Promise<Result<U>>;

  public async execute(incoming: T): Promise<Result<U | Error>> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.handleOnGeneralError(err));
  }

  protected onCreated(content: U): Result<U> {
    return { content, status: HttpStatus.created };
  }

  protected onDomainError(content: DomainError): Result<DomainError> {
    return {
      content,
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: Error): Result<Error> {
    return {
      content,
      status: HttpStatus.internalError,
    };
  }

  private handleOnGeneralError(err: unknown): Result<Error> {
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

export function handleErrorOrOutDTOResult(result: Error | OutDTO<unknown>) {
  if (result instanceof Error) {
    return { message: result.message };
  }

  if (result instanceof OutDTO) {
    return result.toRaw();
  }

  throw new Error("Unexpected result type");
}
