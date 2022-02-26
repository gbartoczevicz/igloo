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

export abstract class Service<T> {
  protected readonly application: T;

  public constructor(application: T) {
    this.application = application;
  }

  public abstract listen(port: number): void;
  public abstract close(): void;
}
