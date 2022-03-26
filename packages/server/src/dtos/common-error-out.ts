import { OutDTO } from "~/contracts/dtos";
import { AuthenticationError, InvalidField, SignUpError } from "~/errors";

type ExpectedErrors = Error | InvalidField | Error[] | InvalidField[];

export class CommonErrorOut extends OutDTO<ExpectedErrors> {
  public constructor(outcoming: ExpectedErrors) {
    super(outcoming);
  }

  public toRaw(): unknown {
    if (Array.isArray(this.outcoming)) {
      return this.outcoming.map((o) => {
        if (o instanceof InvalidField) {
          return { [o.field]: o.message };
        }

        return { message: o.message };
      });
    }

    if (this.outcoming instanceof AuthenticationError) {
      return undefined;
    }

    if (this.outcoming instanceof SignUpError) {
      return undefined;
    }

    return { message: this.outcoming.message };
  }
}
