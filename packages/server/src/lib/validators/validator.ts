import { InvalidField } from "~/errors/field-tmp";
import { ValidationOptions as Options } from "./options";
import { validatorMapping } from "./mapper";

type Params = Record<string, {
  option: Options;
  value: unknown;
}>;

export function validator(params: Params): InvalidField[] {
  const invalidFields: InvalidField[] = [];

  const entries = Object.entries(params);

  for (const [field, entry] of entries) {
    const validatorFun = validatorMapping[entry.option];

    if (!validatorFun) throw new Error("Unmapped validation type");

    const isValid = validatorFun(entry.value);

    if (isValid) continue;

    invalidFields.push(new InvalidField(field, entry.option));
  }

  return invalidFields;
}
