import { InvalidField, InvalidFields } from "~/errors";
import { ValidationOptions as Options } from "./options";
import { validatorMapping } from "./mapper";
import { Either, left, right } from "../logic/either";

type Params = Record<string, {
  option: Options;
  value: unknown;
}>;

export function validator(params: Params): Either<null, InvalidFields> {
  const invalidFields: InvalidField[] = [];

  const entries = Object.entries(params);

  for (const [field, entry] of entries) {
    const validatorFun = validatorMapping[entry.option];

    if (!validatorFun) throw new Error("Unmapped validation type");

    const isValid = validatorFun(entry.value);

    if (isValid) continue;

    invalidFields.push({
      field,
      reason: entry.option,
    });
  }

  if (invalidFields.length > 0) {
    return right(new InvalidFields(invalidFields));
  }

  return left(null);
}
