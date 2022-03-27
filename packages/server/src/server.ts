import * as E from "express";

import * as SetupRoutes from "~/setup/routes";
import * as SetupMiddlewares from "~/setup/middlewares";

import { SystemSetup } from "~/contracts/setup/system";
import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

export function createServer(systemSetup: SystemSetup) {
  const express = E.default();

  const commonLogger = SetupMiddlewares.commonRequest();
  const userAuthenticated = SetupMiddlewares.userAuthenticated(systemSetup);

  const router: HttpContracts.Router<
    E.Router,
    E.Request,
    E.Response,
    E.NextFunction
  > = new HttpAdapters.HttpRouter([
    SetupRoutes.setupCreateUsers(systemSetup),
    SetupRoutes.setupCreateSession(systemSetup),
    SetupRoutes.setupCreateInstitutions(systemSetup, userAuthenticated),
  ]);

  express.use(E.json());
  express.use(commonLogger);

  express.use(
    (router as HttpAdapters.HttpRouter).create(),
  );

  return new HttpAdapters.HttpService(express);
}