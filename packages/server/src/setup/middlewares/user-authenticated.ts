import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { AuthenticateUserController } from "~/domain/controllers";
import { AuthenticateUserUseCase } from "~/domain/usecases";
import { AuthenticatedUserIn, AuthenticateUserIn } from "~/dtos";

export function userAuthenticated(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new AuthenticateUserUseCase(
    systemSetup.hash.tokenProvider,
    systemSetup.factories.idFactory,
    systemSetup.repositories.usersRepo,
  );
  const controller = new AuthenticateUserController(usecase);

  return (req, res, next) => {
    const result = AuthenticateUserIn.create(req.headers.authorization);

    if (!(result instanceof AuthenticateUserIn)) {
      return res.status(result.status).json(result.content.toRaw());
    }

    controller.execute(result).then((userOut) => {
      if (userOut.status !== HttpStatus.ok) {
        return res.status(userOut.status).json(userOut.content.toRaw());
      }

      const authenticatedUser = userOut.content.toRaw() as any;

      const result = new AuthenticatedUserIn(authenticatedUser);

      req.authenticatedUserIn = result;

      return next();
    });
  };
}
