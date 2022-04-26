import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { AuthenticateUserController } from "~/presentation";
import { AuthenticateUserUseCase } from "~/domain/usecases";

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
    const token = req.headers.authorization;

    controller.execute({ token }).then((outcoming) => {
      if (outcoming.status !== HttpStatus.ok) {
        return res.status(outcoming.status).json(outcoming.content);
      }

      req.currentUser = outcoming.content as any;

      return next();
    });
  };
}
