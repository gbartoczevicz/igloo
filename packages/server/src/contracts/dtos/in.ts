import { InvalidField } from "~/errors";
import { Result } from "../presentation";

export type InDTOResult<T, U> = T | Result<U>;

export const enum DTOValidationMapping {
  requiredString = "is a required string",
  requiredNumber = "is a required number",
  requiredList = "is a required list",
  optionalString = "is a string",
  optionalNumber = "is a number",
  optionalList = "is a list",
}

type ParamToValidate = {
  validationType: DTOValidationMapping;
  value: unknown;
};

type ParamsToValidate = Record<string, ParamToValidate>;

const isNil = (val: unknown) => val === undefined || val === null;

const validatorMapping = {
  [DTOValidationMapping.optionalList]: (val: unknown) =>
    !isNil(val) && Array.isArray(val),
  [DTOValidationMapping.optionalNumber]: (val: unknown) =>
    !isNil(val) && !Number.isNaN(val),
  [DTOValidationMapping.optionalString]: (val: unknown) =>
    !isNil(val) && typeof val === "string",
  [DTOValidationMapping.requiredList]: (val: unknown) => Array.isArray(val),
  [DTOValidationMapping.requiredNumber]: (val: unknown) => !Number.isNaN(val),
  [DTOValidationMapping.requiredString]: (val: unknown) =>
    typeof val === "string",
};

export abstract class InDTO {
  protected static validate(params: ParamsToValidate): InvalidField[] {
    const invalidFields: InvalidField[] = [];

    const paramsEntries = Object.entries(params);

    for (const [key, paramEntry] of paramsEntries) {
      const validatorEntry = validatorMapping[paramEntry.validationType];

      if (!validatorEntry) throw new Error("Unmapped validation type");

      const isValid = validatorEntry(paramEntry.value);

      if (isValid) continue;

      invalidFields.push(new InvalidField(key, paramEntry.validationType));
    }

    return invalidFields;
  }
}
