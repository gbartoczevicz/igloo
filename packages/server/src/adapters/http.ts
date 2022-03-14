import { Server } from "http";
import * as E from "express";

import * as C from "~/contracts/http";

export class HttpService extends C.Service<E.Application> {
  private server?: Server;

  public constructor(application: E.Application) {
    super(application);
  }

  public override listen(port: number): void {
    this.server = this.application.listen(port, () => {
      console.log("The service has been started", port);
    });
  }

  public override close(): void {
    this.server?.close((err) =>
      console.log("The service has been closed", err)
    );
  }
}

export class HttpRoute extends C.Route<E.Request, E.Response, E.NextFunction> {
  public constructor(
    path: string,
    method: C.Method,
    middlewares: C.Middleware<
      E.Request,
      E.Response,
      E.NextFunction
    >[],
    handle: C.Middleware<E.Request, E.Response, E.NextFunction>,
  ) {
    super(path, method, middlewares, handle);
  }
}

export class HttpRouter extends C.Router<
  E.Router,
  E.Request,
  E.Response,
  E.NextFunction
> {
  public constructor(
    routes: C.Route<E.Request, E.Response, E.NextFunction>[],
  ) {
    super(routes);
  }

  public override create(): E.Router {
    const router = E.Router();

    this.routes.forEach((r) =>
      router[r.method](r.path, r.middlewares, r.handle)
    );

    return router;
  }
}

export const handleOnResult: C.HandleOnResult<E.Response> = <T>(
  response: C.Result<T>,
  res: E.Response,
) => {
  const { body, status } = response.toJson();
  res.status(status).json(body);
};
