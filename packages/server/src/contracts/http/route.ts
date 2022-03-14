import { Method } from ".";

export type Middleware<T, U, V> = (request: T, response: U, next: V) => void;

type MiddlewareParam<T, U, V> = Middleware<T, U, V> | Middleware<T, U, V>[];

export abstract class Route<T, U, V> {
  public readonly path: string;

  public readonly method: Method;

  public readonly middlewares: Middleware<T, U, V>[];

  public readonly handle: Middleware<T, U, V>;

  protected constructor(
    path: string,
    method: Method,
    handle: Middleware<T, U, V>,
    middlewareParam?: MiddlewareParam<T, U, V>,
  ) {
    this.path = path;
    this.method = method;
    this.handle = handle;
    this.middlewares = this.adaptMiddlewareParam(middlewareParam);
  }

  private adaptMiddlewareParam(middlewareParam?: MiddlewareParam<T, U, V>) {
    if (middlewareParam === undefined) {
      return [];
    }

    if (Array.isArray(middlewareParam)) {
      return middlewareParam;
    }

    return [middlewareParam];
  }
}

export abstract class Router<A, T, U, V> {
  protected readonly routes: Route<T, U, V>[];

  protected constructor(routes: Route<T, U, V>[]) {
    this.routes = routes;
  }

  protected abstract create(): A;
}
