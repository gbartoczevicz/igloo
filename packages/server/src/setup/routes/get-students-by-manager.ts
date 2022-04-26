import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetStudentsByManagerController } from "~/presentation";
import { GetStudentsByManagerUseCase } from "~/domain/usecases";

export function setupGetStudentsByManager(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const getStudentsByManagerUseCase = new GetStudentsByManagerUseCase(
    systemSetup.repositories.studentsRepo,
    systemSetup.repositories.usersRepo,
  );

  const controller = new GetStudentsByManagerController(
    getStudentsByManagerUseCase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/students",
    Method.get,
    (req, res, _next) => {
      controller.execute({ manager: req.currentManager }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerAuthenticated],
  );
}
