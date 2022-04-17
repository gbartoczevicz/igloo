import { AuthenticationError, DomainError, SignUpError } from "~/errors";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";
import { CommonError } from "~/errors/common";

export abstract class Controller {
  protected abstract handle(incoming: unknown): Promise<Result<unknown>>;

  public async execute(incoming: unknown): Promise<Result<unknown>> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.serializeOnAnyError(err));
  }

  protected onOk(content: unknown): Result<unknown> {
    return { content, status: HttpStatus.ok };
  }

  protected onCreated(content: unknown): Result<unknown> {
    return { content, status: HttpStatus.created };
  }

  protected onDomainError(content: unknown): Result<unknown> {
    return {
      content,
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: unknown): Result<unknown> {
    return {
      content,
      status: HttpStatus.internalError,
    };
  }

  protected onUnauthorized(content: unknown): Result<unknown> {
    return {
      content,
      status: HttpStatus.unauthorized,
    };
  }

  private serializeOnAnyError(err: unknown): Result<unknown> {
    console.warn(err);

    if (err instanceof DomainError) {
      return this.onDomainError(CommonError.toRaw(err));
    }

    if (err instanceof SignUpError) {
      return this.onUnauthorized(CommonError.toRaw(err));
    }

    if (err instanceof AuthenticationError) {
      return this.onUnauthorized(CommonError.toRaw(err));
    }

    if (err instanceof Error) {
      return this.onInternalError(CommonError.toRaw(err));
    }

    const unmappedError = new Error("Unmapped error occurred");

    return this.onInternalError(CommonError.toRaw(unmappedError));
  }
}
