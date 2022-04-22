import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetProfessorsByManagerController } from "~/presentation";
import { GetProfessorsByManagerUseCase } from "~/domain/usecases";

export function setupGetProfessorsByManager(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const getProfessorsByManagerUseCase = new GetProfessorsByManagerUseCase(
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.usersRepo,
  );

  const controller = new GetProfessorsByManagerController(
    getProfessorsByManagerUseCase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/professors",
    Method.get,
    (req, res, _next) => {
      controller.execute({ manager: req.currentManager }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerAuthenticated],
  );
}
