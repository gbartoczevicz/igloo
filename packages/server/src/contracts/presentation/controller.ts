import { CommonErrorOut } from "~/dtos";
import { DomainError } from "~/errors";
import { InDTO, OutDTO } from "../dtos";
import { HttpStatus } from "../http";
import { Result } from "./result";

type UnknownOutDTO = OutDTO<unknown>;

export abstract class Controller<T extends InDTO, U extends UnknownOutDTO> {
  protected abstract handle(incoming: T): Promise<Result<U>>;

  public async execute(incoming: T): Promise<Result<UnknownOutDTO>> {
    return await this.handle(incoming)
      .then((result) => result)
      .catch((err) => this.serializeOnAnyError(err));
  }

  protected onCreated(content: U): Result<U> {
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

  private serializeOnAnyError(err: unknown): Result<CommonErrorOut> {
    console.warn(err);

    if (err instanceof DomainError) {
      return this.onDomainError(new CommonErrorOut(err));
    }

    if (err instanceof Error) {
      return this.onInternalError(new CommonErrorOut(err));
    }

    const out = new CommonErrorOut(new Error("Unmapped error occurred"));

    return this.onInternalError(out);
  }
}
