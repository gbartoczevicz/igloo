import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateProfessorController } from "~/presentation";
import { CreateProfessorUseCase } from "~/domain/usecases";

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
      const incoming = {
        ...(req.body) || {},
        manager: req.currentManager,
      };

      controller.execute(incoming).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerAuthenticated],
  );
}
