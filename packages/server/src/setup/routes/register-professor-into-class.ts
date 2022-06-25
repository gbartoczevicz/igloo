import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { RegisterProfessorIntoClassUseCase } from "~/domain/usecases";
import { RegisterProfessorIntoClassController } from "~/presentation";

export function setupRegisterProfessorIntoClass(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const usecase = new RegisterProfessorIntoClassUseCase(
    systemSetup.repositories.professorClassRegistrationsRepo,
    systemSetup.factories.professorClassRegistrationFactory,
    systemSetup.repositories.classCoursesRepo,
    systemSetup.repositories.professorsRepo,
  );

  const controller = new RegisterProfessorIntoClassController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId/professor-class-registration",
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
