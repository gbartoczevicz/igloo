import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { AuthenticateManagerController } from "~/presentation";
import { AuthenticateManagerUseCase } from "~/domain/usecases";

export function managerAuthenticated(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new AuthenticateManagerUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.institutionManagersRepo,
  );
  const controller = new AuthenticateManagerController(usecase);

  return (req, res, next) => {
    const incoming = {
      user: req.currentUser,
      institutionId: req.params.institutionId,
    };

    controller.execute(incoming).then((managerOut) => {
      if (managerOut.status !== HttpStatus.ok) {
        return res.status(managerOut.status).json(managerOut.content);
      }

      req.currentManager = managerOut.content as any;

      return next();
    });
  };
}
