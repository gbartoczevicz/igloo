export enum Method {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export type Middleware<T, U> = (
  request: T,
  response: U,
  next: Function,
) => void;

export type Route<T, U> = {
  route: string;
  method: Method;
  handle: (request: T) => U;
  middlewares?: Middleware<T, U>[];
};

export abstract class Service<T> {
  protected readonly application: T;

  public constructor(application: T) {
    this.application = application;
  }

  public abstract listen(port: number): void;
  public abstract close(): void;
}

export abstract class Router<A, T, U> {
  protected readonly routes: Route<T, U>[];

  public constructor(routes: Route<T, U>[]) {
    this.routes = routes;
  }

  public abstract create(): A;
}
