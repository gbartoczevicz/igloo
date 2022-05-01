import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateDisciplinesUseCase } from "~/domain/usecases";
import { CreateDisciplineController } from "~/presentation";

export function setupCreateDiscipline(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const usecase = new CreateDisciplinesUseCase(
    systemSetup.factories.disciplineFactory,
    systemSetup.repositories.disciplinesRepo,
    systemSetup.repositories.coursesRepo,
  );

  const controller = new CreateDisciplineController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId/disciplines",
    Method.post,
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
