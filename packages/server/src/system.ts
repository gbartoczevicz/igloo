import express from "express";

import { createSystem } from "~/components/implementation/system";
import { Http } from "~/components/http";

import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

const httpApplication = express();

const router = new HttpAdapters.HttpRouter([
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

httpApplication.use(express.json());

httpApplication.use((_req, _res, next) => {
  console.log("Common middleware", Date.now());
  next();
});

httpApplication.use(router.create());

const httpService = new HttpAdapters.HttpService(httpApplication);

export const system = createSystem({
  http: new Http(httpService, 3333),
});
