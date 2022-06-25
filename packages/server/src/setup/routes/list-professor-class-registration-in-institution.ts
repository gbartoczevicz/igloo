import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { ListProfessorClassRegistrationInInstitutionUseCase } from "~/domain/usecases";
import { ListProfessorClassRegistrationInInstitutionController } from "~/presentation";

export function setupListProfessorClassRegistrationInInstitution(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListProfessorClassRegistrationInInstitutionUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.professorClassRegistrationsRepo,
  );

  const controller = new ListProfessorClassRegistrationInInstitutionController(
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/professor-class-registration",
    Method.get,
    (req, res, _next) => {
      controller.execute(req.params).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
