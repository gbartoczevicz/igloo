import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import * as Errors from "~/errors";

export abstract class Controller {
  protected abstract handle(incoming?: unknown): Promise<HttpResult>;

  public async execute(incoming?: unknown): Promise<HttpResult> {
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

  protected onUnprocessableEntity(content: unknown): HttpResult {
    return {
      content,
      status: HttpStatus.unprocessableEntity,
    };
  }

  protected onInternalError(): HttpResult {
    return {
      status: HttpStatus.internalError,
    };
  }

  protected onUnauthorized(): HttpResult {
    return {
      status: HttpStatus.unauthorized,
    };
  }

  protected onForbidden(): HttpResult {
    return { status: HttpStatus.forbidden };
  }

  private serializeOnAnyError(err: unknown): HttpResult {
    console.warn(err);

    if (err instanceof Errors.InvalidFields) {
      return this.onUnprocessableEntity(err.toRaw());
    }

    if (err instanceof Errors.ForbiddenError) {
      return this.onForbidden();
    }

    if (err instanceof Errors.UnauthorizedError) {
      return this.onUnauthorized();
    }

    if (err instanceof Errors.DomainError) {
      return this.onUnprocessableEntity(err.toRaw());
    }

    return this.onInternalError();
  }
}
