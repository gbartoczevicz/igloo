import { AuthenticationError, DomainError, SignUpError } from "~/errors";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { CommonError } from "~/errors/common";

export abstract class Controller {
  protected abstract handle(incoming: unknown): Promise<HttpResult>;

  public async execute(incoming: unknown): Promise<HttpResult> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.serializeOnAnyError(err));
  }

  protected onOk(content: unknown): HttpResult {
    return { content, status: HttpStatus.ok };
  }

  protected onCreated(content: unknown): HttpResult {
    return { content, status: HttpStatus.created };
  }

  protected onDomainError(content: unknown): HttpResult {
    return {
      content,
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: unknown): HttpResult {
    return {
      content,
      status: HttpStatus.internalError,
    };
  }

  protected onUnauthorized(content: unknown): HttpResult {
    return {
      content,
      status: HttpStatus.unauthorized,
    };
  }

  private serializeOnAnyError(err: unknown): HttpResult {
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
