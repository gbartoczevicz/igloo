import { Server } from "http";
import * as E from "express";

import * as HttpContracts from "~/contracts/http";

export class HttpService extends HttpContracts.Service<E.Application> {
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

export class HttpRouter
  extends HttpContracts.Router<E.Router, E.Request, E.Response> {
  public constructor(routes: HttpContracts.Route<E.Request, E.Response>[]) {
    super(routes);
  }

  public override create(): E.Router {
    const router = E.Router();

    this.routes.forEach((route) => {
      const maybeArray = route.middlewares ?? [];

      const middlewares = Array.isArray(maybeArray) ? maybeArray : [maybeArray];

      router[route.method](route.path, [...middlewares, route.handle]);
    });

    return router;
  }
}

export const handleOnResult: HttpContracts.HandleOnResult<E.Response> = <T>(
  response: HttpContracts.Result<T>,
  res: E.Response,
) => {
  const { body, status } = response.toJson();
  res.status(status).json(body);
};
