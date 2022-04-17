import {
  DomainError,
} from "~/errors";

import { InvalidField } from "./field-tmp";

type ExpectedErrors = Error | InvalidField | Error[] | InvalidField[];

export class CommonError {
  public static toRaw(errors: ExpectedErrors): unknown {
    if (Array.isArray(errors)) {
      return errors.map((o) => {
        if (o instanceof InvalidField) {
          return { [o.field]: o.message };
        }

        return { message: o.message };
      });
    }

    if (errors instanceof DomainError) {
      return { message: errors.message };
    }

    return undefined;
  }
}
