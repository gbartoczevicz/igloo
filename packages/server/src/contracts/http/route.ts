import { Method } from ".";

export type Middleware<T, U, V> = (request: T, response: U, next: V) => void;

export abstract class Route<T, U, V> {
  public readonly path: string;

  public readonly method: Method;

  public readonly middlewares: Middleware<T, U, V>[];

  public readonly handle: Middleware<T, U, V>;

  protected constructor(
    path: string,
    method: Method,
    middlewares: Middleware<T, U, V>[],
    handle: Middleware<T, U, V>,
  ) {
    this.path = path;
    this.method = method;
    this.middlewares = middlewares;
    this.handle = handle;
  }
}

export abstract class Router<A, T, U, V> {
  protected readonly routes: Route<T, U, V>[];

  protected constructor(routes: Route<T, U, V>[]) {
    this.routes = routes;
  }

  protected abstract create(): A;
}
