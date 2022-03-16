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
