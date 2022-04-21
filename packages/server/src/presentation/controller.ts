import { AuthenticationError, DomainError, SignUpError } from "~/errors";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { InvalidFields } from "~/errors/field-tmp";

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

  protected onUnauthorized(): HttpResult {
    return {
      content: undefined,
      status: HttpStatus.unauthorized,
    };
  }

  protected onForbidden(): HttpResult {
    return { content: undefined, status: HttpStatus.forbidden };
  }

  private serializeOnAnyError(err: unknown): HttpResult {
    console.warn(err);

    if (err instanceof InvalidFields) {
      return this.onDomainError({
        message: err.message,
        fields: err.fields.map((field) => (
          { name: field.field, reason: field.reason }
        )),
      });
    }

    if (err instanceof DomainError) {
      return this.onDomainError({ message: err.message });
    }

    if (err instanceof SignUpError) {
      return this.onUnauthorized(undefined);
    }

    if (err instanceof AuthenticationError) {
      return this.onUnauthorized(undefined);
    }

    return this.onInternalError(undefined);
  }
}
