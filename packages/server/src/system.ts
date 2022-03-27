import * as SystemSetup from "~/setup/system";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import { createServer } from "./server";
import { createDatabase } from "./database";

const database = createDatabase();

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
