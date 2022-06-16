import { HttpMiddleware, HttpRoute } from "~/adapters/http";

import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetInsittutionCoursesController } from "~/presentation";
import { GetInstitutionCoursesUseCase } from "~/domain/usecases";

export function setupGetInstitutionCourses(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new GetInstitutionCoursesUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.coursesRepo,
  );

  const controller = new GetInsittutionCoursesController(
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/courses",
    Method.get,
    (req, res, _next) => {
      controller.execute({ institutionId: req.params.institutionId }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
