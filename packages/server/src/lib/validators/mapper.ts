import { ValidationOptions as Options } from "./options";

type ValidatorFunMapping = Record<Options, (v: unknown) => boolean>;

const isNil = (v: unknown) => v === undefined || v === null;

export const validatorMapping: ValidatorFunMapping = {
  [Options.optionalList]: (v) => {
    if (isNil(v)) return true;

    return Array.isArray(v);
  },
  [Options.optionalNumber]: (v) => {
    if (isNil(v)) return true;

    return typeof v === "number";
  },
  [Options.optionalString]: (v) => {
    if (isNil(v)) return true;

    return typeof v === "string";
  },
  [Options.requiredList]: (v) => Array.isArray(v),
  [Options.requiredNumber]: (v) => typeof v === "number",
  [Options.requiredString]: (v) => typeof v === "string",
};
