import { CommonErrorOut } from "~/dtos";
import { AuthenticationError, DomainError, SignUpError } from "~/errors";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";

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

  protected onDomainError(content: CommonErrorOut): Result<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: CommonErrorOut): Result<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.internalError,
    };
  }

  protected onUnauthorized(content: CommonErrorOut): Result<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.unauthorized,
    };
  }

  private serializeOnAnyError(err: unknown): Result<CommonErrorOut> {
    console.warn(err);

    if (err instanceof DomainError) {
      return this.onDomainError(new CommonErrorOut(err));
    }

    if (err instanceof SignUpError) {
      return this.onUnauthorized(new CommonErrorOut(err));
    }

    if (err instanceof AuthenticationError) {
      return this.onUnauthorized(new CommonErrorOut(err));
    }

    if (err instanceof Error) {
      return this.onInternalError(new CommonErrorOut(err));
    }

    const out = new CommonErrorOut(new Error("Unmapped error occurred"));

    return this.onInternalError(out);
  }
}
