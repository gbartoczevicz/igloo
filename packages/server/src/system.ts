import * as SystemSetup from "~/setup/system";

import { createSystem } from "~/lib/component";
import { Http } from "~/components/http";

import { createServer } from "./server";
import { createDatabase } from "./database";
import { config } from "./config";

console.log("Config", config);

const database = createDatabase(config);

const systemSetup = SystemSetup.systemSetup(
  config,
  database
);

const httpService = createServer(systemSetup);

export const system = createSystem({
  database,
  http: new Http(httpService, 3333),
});
