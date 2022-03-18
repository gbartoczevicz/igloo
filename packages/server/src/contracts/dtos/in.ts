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

type ValidatorFun = (v: unknown) => boolean;

type ValodatorFunMapping = Record<DTOValidationMapping, ValidatorFun>;

const isNil: ValidatorFun = (v: unknown) => v === undefined || v === null;

const validatorMapping: ValodatorFunMapping = {
  [DTOValidationMapping.optionalList]: (v) => !isNil(v) && Array.isArray(v),
  [DTOValidationMapping.optionalNumber]: (v) => !isNil(v) && !Number.isNaN(v),
  [DTOValidationMapping.optionalString]: (v) =>
    !isNil(v) && typeof v === "string",
  [DTOValidationMapping.requiredList]: (v) => Array.isArray(v),
  [DTOValidationMapping.requiredNumber]: (v) => !Number.isNaN(v),
  [DTOValidationMapping.requiredString]: (v) => typeof v === "string",
};

export abstract class InDTO {
  protected static validate(params: ParamsToValidate): InvalidField[] {
    const invalidFields: InvalidField[] = [];

    const paramsEntries = Object.entries(params);

    for (const [field, entry] of paramsEntries) {
      const validatorFun = validatorMapping[entry.validationType];

      if (!validatorFun) throw new Error("Unmapped validation type");

      const isValid = validatorFun(entry.value);

      if (isValid) continue;

      invalidFields.push(new InvalidField(field, entry.validationType));
    }

    return invalidFields;
  }
}
