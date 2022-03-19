import { HttpStatus } from "../http";

export type Result<T> = {
  status: HttpStatus;
  content: T;
};
