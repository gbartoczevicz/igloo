import { CommonErrorOut } from "~/dtos";
import { AuthenticationError, DomainError, SignUpError } from "~/errors";
import { InDTO, OutDTO } from "../dtos";
import { HttpStatus } from "../http";
import { HttpResult } from "./result";

type UnknownOutDTO = OutDTO<unknown>;

export abstract class Controller<T extends InDTO, U extends UnknownOutDTO> {
  protected abstract handle(incoming: T): Promise<HttpResult<U>>;

  public async execute(incoming: T): Promise<HttpResult<UnknownOutDTO>> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.serializeOnAnyError(err));
  }

  protected onOk(content: U): HttpResult<U> {
    return { content, status: HttpStatus.ok };
  }

  protected onCreated(content: U): HttpResult<U> {
    return { content, status: HttpStatus.created };
  }

  protected onDomainError(content: CommonErrorOut): HttpResult<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.badRequest,
    };
  }

  protected onInternalError(content: CommonErrorOut): HttpResult<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.internalError,
    };
  }

  protected onUnauthorized(content: CommonErrorOut): HttpResult<CommonErrorOut> {
    return {
      content,
      status: HttpStatus.unauthorized,
    };
  }

  private serializeOnAnyError(err: unknown): HttpResult<CommonErrorOut> {
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
