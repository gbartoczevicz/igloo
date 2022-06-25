import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { ListStudentClassRegistrationInInstitutionUseCase } from "~/domain/usecases";
import { ListStudentClassRegistrationInInstitutionController } from "~/presentation";

export function setupListStudentClassRegistrationInInstitution(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListStudentClassRegistrationInInstitutionUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.studentClassRegistrationsRepo,
  );

  const controller = new ListStudentClassRegistrationInInstitutionController(
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/student-class-registration",
    Method.get,
    (req, res, _next) => {
      controller.execute(req.params).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
