import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateCourseController } from "~/presentation";
import { CreateCourseUseCase } from "~/domain/usecases";

export function setupCreateCourse(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const createCourseUseCase = new CreateCourseUseCase(
    systemSetup.factories.courseFactory,
    systemSetup.repositories.coursesRepo,
  );

  const controller = new CreateCourseController(createCourseUseCase);

  return new HttpRoute(
    "/institutions/:institutionId/courses",
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
