import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { RegisterStudentIntoClassUseCase } from "~/domain/usecases";
import { RegisterStudentIntoClassController } from "~/presentation";

export function setupRegisterStudentIntoClass(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const usecase = new RegisterStudentIntoClassUseCase(
    systemSetup.repositories.studentClassRegistrationsRepo,
    systemSetup.factories.studentClassRegistrationFactory,
    systemSetup.repositories.classCoursesRepo,
    systemSetup.repositories.studentsRepo,
  );

  const controller = new RegisterStudentIntoClassController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId/student-class-registration",
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
