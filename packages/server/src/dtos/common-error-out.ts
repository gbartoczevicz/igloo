import { OutDTO } from "~/contracts/dtos";
import { InvalidField } from "~/errors";

type ExpectedErrors = Error | InvalidField | Error[] | InvalidField[];

export class CommonErrorOut extends OutDTO<ExpectedErrors> {
  public constructor(outcoming: ExpectedErrors) {
    super(outcoming);
  }

  public toRaw(): unknown {
    let serializedError: unknown;

    if (Array.isArray(this.outcoming)) {
      serializedError = this.outcoming.map((o) => {
        if (o instanceof InvalidField) {
          return { [o.field]: o.message };
        }

        return { message: o.message };
      });
    } else {
      serializedError = { message: this.outcoming.message };
    }

    return serializedError;
  }
}
