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
  [Options.requiredDate]: (v) => {
    if (isNil(v)) {
      return false;
    }

    const date = new Date(v as any);

    return !isNaN(date.valueOf());
  },
  [Options.optionalDate]: (v) => {
    if (isNil(v)) {
      return true;
    }

    const date = new Date(v as any);

    return !isNaN(date.valueOf());
  },
};
