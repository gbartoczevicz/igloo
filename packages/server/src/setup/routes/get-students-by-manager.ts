import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetStudentsByManagerController } from "~/domain/controllers";
import { GetStudentsByManagerUseCase } from "~/domain/usecases";
import { GetStudentsByManagerIn } from "~/dtos";

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
      controller.execute(req.getStudentsByManager).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, managerAuthenticated, (req, res, next) => {
      const result = GetStudentsByManagerIn.create({ manager: req.manager });

      if (result instanceof GetStudentsByManagerIn) {
        req.getStudentsByManager = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
