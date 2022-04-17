import { ValidationOptions } from "~/lib/validators/options";

export type InvalidField = {
  field: string;
  reason: ValidationOptions;
}

export class InvalidFields extends Error {
  public readonly fields: InvalidField[];

  public constructor(fields: InvalidField[]) {
    super("Some of the sent fields are invalid");
    this.fields = fields;
  }
}
