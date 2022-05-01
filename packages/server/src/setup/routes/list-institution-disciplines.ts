import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { ListInstitutionDisciplinesUseCase } from "~/domain/usecases";
import { ListInstitutionDisciplinesController } from "~/presentation";

export function setupListInstitutionDisciplines(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const usecase = new ListInstitutionDisciplinesUseCase(
    systemSetup.repositories.disciplinesRepo,
    systemSetup.repositories.coursesRepo,
  );

  const controller = new ListInstitutionDisciplinesController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId/disciplines",
    Method.get,
    (req, res, _next) => {
      const incoming = {
        ...(req.body || {}),
        manager: req.currentManager,
      };

      controller.execute(incoming).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerAuthenticated],
  );
}
