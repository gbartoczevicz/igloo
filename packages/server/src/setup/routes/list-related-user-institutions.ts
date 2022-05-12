import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { ListRelatedUserInstitutionsUseCase } from "~/domain/usecases";
import { ListRelatedUserInstitutionsController } from "~/presentation";

export function setupListRelatedUserInstitutions(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
) {
  const usecase = new ListRelatedUserInstitutionsUseCase(
    systemSetup.repositories.institutionManagersRepo,
    systemSetup.repositories.studentsRepo,
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.institutionsRepo,
  );

  const controller = new ListRelatedUserInstitutionsController(usecase);

  return new HttpRoute(
    "/institutions",
    Method.get,
    (req, res, _next) => {
      const incoming = {
        ...(req.body || {}),
        user: req.currentUser,
      };

      controller.execute(incoming).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated],
  );
}
