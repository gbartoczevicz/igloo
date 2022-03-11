import { Out } from "~/dtos";

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
  path: string;
  method: Method;
  handle: (request: T, response: U) => void;
  middlewares?: Middleware<T, U> | Middleware<T, U>[];
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

export enum HttpStatus {
  created = 201,
  badRequest = 400,
  internalError = 500,
}

export class Result {
  public constructor(
    private readonly status: HttpStatus,
    private readonly content?: string | Out,
  ) { }

  public toJson() {
    const body = this.content instanceof Out
      ? this.content.toRaw()
      : this.content;

    return { status: this.status, body };
  }
}

export abstract class Controller {
  abstract execute(incoming: unknown): Promise<Result>;
}

export type HandleOnResult<T> = (response: Result, res: T) => void;
