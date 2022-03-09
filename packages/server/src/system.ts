import * as E from "express";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

const express = E.default();

const router: HttpContracts.Router<E.Router, E.Request, E.Response> =
  new HttpAdapters.HttpRouter([
    {
      path: "/",
      method: HttpContracts.Method.get,
      handle: (_, res) => res.sendStatus(418),
      middlewares: (req, _, next) => {
        console.log("Requester IP", req.ip);
        next();
      },
    },
    {
      path: "/test-many-middlewares",
      method: HttpContracts.Method.get,
      handle: (_, res) => res.sendStatus(501),
      middlewares: [
        (_req, _res, next) => {
          console.log("First middleware");
          next();
        },
        (_req, _res, next) => {
          console.log("Second middleware");
          next();
        },
      ],
    },
    {
      path: "/with-no-middleware",
      method: HttpContracts.Method.get,
      handle: (_, res) => res.sendStatus(200),
    },
  ]);

express.use(E.json());

express.use((_req, _res, next) => {
  console.log("Common middleware", Date.now());
  next();
});

express.use(router.create());

const httpService: HttpContracts.Service<E.Application> = new HttpAdapters
  .HttpService(express);

export const system = createSystem({
  http: new Http(httpService, 3333),
});
