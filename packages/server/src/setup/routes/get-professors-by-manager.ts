import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetProfessorsByManagerController } from "~/domain/controllers";
import { GetProfessorsByManagerUseCase } from "~/domain/usecases";
import { GetProfessorsByManagerIn } from "~/dtos";

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
      controller.execute(req.getProfessorsByManager).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, managerAuthenticated, (req, res, next) => {
      const result = GetProfessorsByManagerIn.create({ manager: req.manager });

      if (result instanceof GetProfessorsByManagerIn) {
        req.getProfessorsByManager = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
