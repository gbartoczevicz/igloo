import { OutDTO } from "../dtos";
import { HttpStatus } from "./status";

export class Result<T> {
  public constructor(
    private readonly status: HttpStatus,
    private readonly content?: string | OutDTO<T>,
  ) {}

  public toJson() {
    const body = this.content instanceof OutDTO
      ? this.content.toRaw()
      : this.content;

    return { status: this.status, body };
  }
}

export type HandleOnResult<T> = (response: Result<T>, res: T) => void;
