import * as SystemSetup from "~/setup/system";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import { Database } from "./components/database";
import { ClientDatabase } from "./contracts/database/client";
import { PrismaClient } from "@prisma/client";
import { PrismaClientDatabase } from "./adapters/database/client";
import { createServer } from "./server";

const prisma = new PrismaClient();

const databaseClient: ClientDatabase<PrismaClient> = new PrismaClientDatabase(
  prisma,
);

const database = new Database(databaseClient);

const systemSetup = SystemSetup.systemSetup(
  database,
  8,
  "igloo_secret_token",
  "1h",
);

const httpService = createServer(systemSetup);

export const system = createSystem({
  database,
  http: new Http(httpService, 3333),
});
