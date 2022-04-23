import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { IsUserAManagerUseCase } from "~/domain/usecases";

export function isUserAManager(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new IsUserAManagerUseCase(
    systemSetup.repositories.institutionManagersRepo,
  );

  return (req, res, next) => {
    usecase.execute({ user: req.currentUser }).then((isAManager) => {
      if (isAManager) {
        return next();
      }

      return res.sendStatus(HttpStatus.unauthorized);
    });
  };
}
