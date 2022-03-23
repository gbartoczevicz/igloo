import * as E from "express";

import * as Setup from "~/setup";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";
import { Database } from "./components/database";
import { ClientDatabase } from "./contracts/database/client";
import { PrismaClient } from "@prisma/client";
import { PrismaClientDatabase } from "./adapters/database/client";

const express = E.default();
const prisma = new PrismaClient();

const databaseClient: ClientDatabase<PrismaClient> = new PrismaClientDatabase(
  prisma,
);

const database = new Database(databaseClient);

const createUser = Setup.setupCreateUsers(database);

const createSession = Setup.setupCreateSession(database);

const router: HttpContracts.Router<
  E.Router,
  E.Request,
  E.Response,
  E.NextFunction
> = new HttpAdapters.HttpRouter([createUser.route, createSession.route]);

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
  database,
  http: new Http(httpService, 3333),
});
