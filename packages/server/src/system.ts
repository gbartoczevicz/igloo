import express from "express";

import { createSystem } from "~/components/implementation/system";
import { Http } from "~/components/http";

import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

const expressApplication = express();

const router = new HttpAdapters.HttpRouter([
  {
    route: "/",
    method: HttpContracts.Method.get,
    handle: (req, res) => {
      console.log("Incoming request", req);

      return res.sendStatus(418);
    },
  },
]);

expressApplication.use(express.json());
expressApplication.use(router.create());

const httpService = new HttpAdapters.HttpService(expressApplication);

export const system = createSystem({
  http: new Http(httpService, 3333),
});
