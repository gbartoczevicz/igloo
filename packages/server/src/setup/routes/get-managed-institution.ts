import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetManagedInstitutionUseCase } from "~/domain/usecases";
import { GetManagedInstitutionController } from "~/presentation";

export function setupGetManagedInstitution(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const usecase = new GetManagedInstitutionUseCase(
    systemSetup.repositories.institutionsRepo,
  );

  const controller = new GetManagedInstitutionController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId",
    Method.get,
    (req, res, _next) => {
      controller.execute({ manager: req.currentManager }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerAuthenticated],
  );
}
