import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateClassCourseController } from "~/presentation";
import { CreateClassCourseUseCase } from "~/domain/usecases";

export function setupCreateClassCourse(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerAuthenticated: HttpMiddleware,
) {
  const createClassCourseUseCase = new CreateClassCourseUseCase(
    systemSetup.factories.classCourseFactory,
    systemSetup.repositories.classCoursesRepo,
    systemSetup.repositories.coursesRepo,
  );

  const controller = new CreateClassCourseController(createClassCourseUseCase);

  return new HttpRoute(
    "/institutions/:institutionId/class-courses",
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
