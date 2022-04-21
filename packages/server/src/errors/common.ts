import { DomainError } from "~/errors";

import { InvalidFields } from "./field-tmp";

type ExpectedErrors = Error | InvalidFields;

export class CommonError {
  public static toRaw(errors: ExpectedErrors): unknown {
    if (errors instanceof InvalidFields) {
      return {
        message: errors.message,
        fields: errors.fields.map((field) => (
          { name: field.field, reason: field.reason }
        )),
      };
    }

    if (errors instanceof DomainError) {
      return { message: errors.message };
    }

    return undefined;
  }
}
