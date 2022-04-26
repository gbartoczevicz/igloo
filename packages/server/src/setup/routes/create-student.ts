import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateStudentController } from "~/presentation";
import { CreateStudentUseCase } from "~/domain/usecases";

export function setupCreateStudent(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const createStudentUseCase = new CreateStudentUseCase(
    systemSetup.repositories.studentsRepo,
    systemSetup.repositories.usersRepo,
    systemSetup.factories.studentFactory,
    systemSetup.factories.idFactory,
  );

  const controller = new CreateStudentController(createStudentUseCase);

  return new HttpRoute(
    "/institutions/:institutionId/students",
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
