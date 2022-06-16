import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { ListInstitutionClassCoursesUseCase } from "~/domain/usecases";
import { ListInstitutionClassCoursesController } from "~/presentation";

export function setupListInstitutionClassCourses(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListInstitutionClassCoursesUseCase(
    systemSetup.repositories.classCoursesRepo,
    systemSetup.factories.idFactory,
  );

  const controller = new ListInstitutionClassCoursesController(usecase);

  return new HttpRoute(
    "/institutions/:institutionId/class-courses",
    Method.get,
    (req, res, _next) => {
      const incoming = {
        institutionId: req.params.institutionId,
      };

      controller.execute(incoming).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
