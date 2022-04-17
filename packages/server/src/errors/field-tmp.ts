import { ValidationOptions } from "~/lib/validators/options";

export class InvalidField extends Error {
  public readonly field: string;

  public constructor(field: string, reason: ValidationOptions) {
    super(reason);
    this.field = field;
  }
}
