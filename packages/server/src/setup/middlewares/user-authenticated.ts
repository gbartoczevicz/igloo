import * as E from "express";
import { HttpStatus, Middleware } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetUserUseCase } from "~/domain/usecases";

export function userAuthenticated(
  systemSetup: SystemSetup,
): Middleware<E.Request, E.Response, E.NextFunction> {
  const usecase = new GetUserUseCase(systemSetup.repositories.usersRepo);

  return (req, res, next) => {
    const headerAuth = req.headers.authorization;

    console.log("Header", headerAuth);

    if (!headerAuth) {
      return res.sendStatus(HttpStatus.unauthorized);
    }

    const [, token] = headerAuth.split(" ");

    console.log("Token", token);

    try {
      const decoded = systemSetup.hash.tokenProvider.decode(token);

      const id = systemSetup.factories.idFactory.create(decoded.sub);

      usecase.execute(id).then((user) => {
        if (!user) return res.sendStatus(HttpStatus.unauthorized);

        req.user = user;

        return next();
      }).catch((err) => {
        console.log("Error", err);

        return res.sendStatus(HttpStatus.internalError);
      });
    } catch (err) {
      console.log("Error", err);

      return res.sendStatus(HttpStatus.unauthorized);
    }
  };
}
