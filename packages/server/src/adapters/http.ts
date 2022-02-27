import { Server } from "http";
import * as E from "express";

import { Route, Router, Service } from "~/contracts/http";

export class HttpService extends Service<E.Application> {
  private server?: Server;

  public constructor(application: E.Application) {
    super(application);
  }

  public listen(port: number): void {
    this.server = this.application.listen(port, () => {
      console.log("The service has been started", port);
    });
  }

  public close(): void {
    this.server?.close((err) =>
      console.log("The service has been closed", err)
    );
  }
}

export class HttpRouter extends Router<E.Router, E.Request, E.Response> {
  public constructor(routes: Route<E.Request, E.Response>[]) {
    super(routes);
  }

  public create(): E.Router {
    const router = E.Router();

    this.routes.forEach((route) => {
      const maybeArray = route.middlewares ?? [];

      const middlewares = Array.isArray(maybeArray) ? maybeArray : [maybeArray];

      router[route.method](route.path, [...middlewares, route.handle]);
    });

    return router;
  }
}
