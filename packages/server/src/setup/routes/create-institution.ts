import * as E from "express";
import { HttpRoute } from "~/adapters/http";

import { HttpStatus, Method, Middleware } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";

type M = Middleware<E.Request, E.Response, E.NextFunction>;

export function setupCreateInstitutions(
  systemSetup: SystemSetup,
  userAuthenticated: M,
) {
  return new HttpRoute("/institutions", Method.post, (req, res, next) => {
    console.log("Institutions Route", req.user);

    return res.sendStatus(HttpStatus.created);
  }, userAuthenticated);
}
