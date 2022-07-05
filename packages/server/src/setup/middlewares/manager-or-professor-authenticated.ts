import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  AuthenticateManagerOrProfessorController,
  AuthenticateManagerOrProfessorUseCase,
} from "~/domain/usecases/authenticate-manager-or-professor";

export function professorOrManagerAuthenticated(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new AuthenticateManagerOrProfessorUseCase(
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.institutionManagersRepo,
  );
  const controller = new AuthenticateManagerOrProfessorController(
    systemSetup.factories.idFactory,
    usecase,
  );

  return (req, res, next) => {
    const incoming = {
      user: req.currentUser,
      institutionId: req.params.institutionId,
    };

    controller.execute(incoming).then((result) => {
      if (result.status !== HttpStatus.ok) {
        return res.status(result.status).json(result.content);
      }

      req.institutionId = result.content as any;

      return next();
    });
  };
}
