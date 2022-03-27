import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateStudentController } from "~/domain/controllers";
import { CreateStudentUseCase } from "~/domain/usecases";
import { CreateStudentIn } from "~/dtos";

export function setupCreateStudent(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const createStudentUseCase = new CreateStudentUseCase(
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.usersRepo,
    systemSetup.factories.studentFactory,
    systemSetup.factories.idFactory,
  );

  const controller = new CreateStudentController(createStudentUseCase);

  return new HttpRoute(
    "/institutions/:institutionId/students",
    Method.post,
    (req, res, _next) => {
      controller.execute(req.createStudent).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, managerAuthenticated, (req, res, next) => {
      const result = CreateStudentIn.create({
        ...req.body,
        manager: req.manager,
      });

      if (result instanceof CreateStudentIn) {
        req.createStudent = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
