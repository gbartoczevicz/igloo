import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateProfessorController } from "~/domain/controllers";
import { CreateProfessorUseCase } from "~/domain/usecases";
import { CreateProfessorIn } from "~/dtos";

export function setupCreateProfessor(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const createProfessorUseCase = new CreateProfessorUseCase(
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.usersRepo,
    systemSetup.factories.professorFactory,
    systemSetup.factories.idFactory,
  );

  const controller = new CreateProfessorController(createProfessorUseCase);

  return new HttpRoute(
    "/institutions/:institutionId/professors",
    Method.post,
    (req, res, _next) => {
      controller.execute(req.createProfessor).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, managerAuthenticated, (req, res, next) => {
      const result = CreateProfessorIn.create({
        ...req.body,
        manager: req.manager,
      });

      if (result instanceof CreateProfessorIn) {
        req.createProfessor = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
