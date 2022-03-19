import { DTOValidationMapping } from "~/contracts/dtos";

export class InvalidField extends Error {
  public readonly field: string;

  public constructor(field: string, reason: DTOValidationMapping) {
    super(reason);
    this.field = field;
  }
}
