import { Result } from "../presentation";

export type InDTOResult<T, U> = T | Result<U>;
