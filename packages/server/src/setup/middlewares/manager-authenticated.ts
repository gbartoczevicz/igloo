import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { AuthenticateManagerController } from "~/domain/controllers";
import { AuthenticateManagerUseCase } from "~/domain/usecases";
import { AuthenticateManagerIn } from "~/dtos";

export function managerAuthenticated(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new AuthenticateManagerUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.institutionManagersRepo,
  );
  const controller = new AuthenticateManagerController(usecase);

  return (req, res, next) => {
    const result = AuthenticateManagerIn.create({
      user: req.authenticatedUserIn.user,
      institutionId: req.params.institutionId,
    });

    if (!(result instanceof AuthenticateManagerIn)) {
      return res.status(result.status).json(result.content.toRaw());
    }

    controller.execute(result).then((managerOut) => {
      if (managerOut.status !== HttpStatus.ok) {
        return res.status(managerOut.status).json(managerOut.content.toRaw());
      }

      req.manager = managerOut.content.toRaw() as any;

      return next();
    });
  };
}
