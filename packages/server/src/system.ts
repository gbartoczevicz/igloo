import * as E from "express";

import * as Setup from "~/setup";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

const express = E.default();

const createUser = Setup.setupCreateUsers();

const router: HttpContracts.Router<
  E.Router,
  E.Request,
  E.Response,
  E.NextFunction
> = new HttpAdapters.HttpRouter([createUser]);

express.use(E.json());

express.use((_req, _res, next) => {
  console.log("Common middleware", Date.now());
  next();
});

express.use(
  (router as HttpAdapters.HttpRouter).create(),
);

const httpService: HttpContracts.Service<E.Application> = new HttpAdapters
  .HttpService(express);

export const system = createSystem({
  http: new Http(httpService, 3333),
});
