import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetManagedInstitutionsUseCase } from "~/domain/usecases";
import { GetManagedInstitutionsController } from "~/presentation";

export function setupGetManagedInstitutions(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
) {
  const usecase = new GetManagedInstitutionsUseCase(
    systemSetup.repositories.institutionManagersRepo,
    systemSetup.repositories.institutionsRepo,
  );

  const controller = new GetManagedInstitutionsController(usecase);

  return new HttpRoute(
    "/institutions",
    Method.get,
    (req, res, _next) => {
      controller.execute({ user: req.currentUser }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated],
  );
}
