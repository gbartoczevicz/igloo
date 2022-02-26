export enum Method {
  get,
  post,
  put,
  delete,
}

export type Route<T, U> = {
  route: string;
  method: Method;
  handle: (request: T) => U;
};
