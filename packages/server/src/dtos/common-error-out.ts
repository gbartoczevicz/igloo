import { OutDTO } from "~/contracts/dtos";

export class CommonErrorOut extends OutDTO<Error | Error[]> {
  public constructor(outcoming: Error | Error[]) {
    super(outcoming);
  }

  public toRaw(): unknown {
    let serializedError: unknown;

    if (Array.isArray(this.outcoming)) {
      serializedError = this.outcoming.map((o) => ({ message: o.message }));
    } else {
      serializedError = { message: this.outcoming.message };
    }

    return serializedError;
  }
}
