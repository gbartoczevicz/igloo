import { HttpStatus } from "../http";

export type HttpResult<T = unknown> = {
  status: HttpStatus;
  content: T;
};
