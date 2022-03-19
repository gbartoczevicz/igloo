import { DomainError } from "~/errors";
import { OutDTO } from "../dtos";
import { HttpStatus } from "../http";
import { Result } from "./result";

export abstract class Controller<T, U> {
  protected abstract handle(incoming: T): Promise<Result<U>>;

  public async execute(incoming: T): Promise<Result<unknown>> {
    const result = await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.serializeOnAnyError(err));

    return this.serializeOnExecuteResult(result);
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

  private serializeOnExecuteResult(result: Result<U | Error>): Result<unknown> {
    const { content, status } = result;

    if (content instanceof OutDTO) {
      return { content: content.toRaw(), status };
    }

    if (content instanceof Error) {
      return {
        content: {
          message: content.message,
        },
        status,
      };
    }

    throw new Error("Invalid result content type");
  }

  private serializeOnAnyError(err: unknown): Result<Error> {
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
