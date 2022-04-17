import { ValidationOptions as Options } from "./options";

type ValidatorFunMapping = Record<Options, (v: unknown) => boolean>;

const isNil = (v: unknown) => v === undefined || v === null;

export const validatorMapping: ValidatorFunMapping = {
  [Options.optionalList]: (v) => !isNil(v) && Array.isArray(v),
  [Options.optionalNumber]: (v) => !isNil(v) && !Number.isNaN(v),
  [Options.optionalString]: (v) => !isNil(v) && typeof v === "string",
  [Options.requiredList]: (v) => Array.isArray(v),
  [Options.requiredNumber]: (v) => !Number.isNaN(v),
  [Options.requiredString]: (v) => typeof v === "string",
};
