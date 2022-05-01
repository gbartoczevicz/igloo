import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetCourseUseCase } from "~/domain/usecases";

export function isCourseFromInstitution(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new GetCourseUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.coursesRepo,
  );

  return (req, res, next) => {
    usecase.execute({ courseId: req.params.courseId }).then((course) => {
      if (!course) {
        return res.sendStatus(HttpStatus.notFound);
      }

      const isTheCourseFromTheSameInstitution = req.currentManager.institutionId
        .isEqual(course.institutionId);

      if (!isTheCourseFromTheSameInstitution) {
        return res.sendStatus(HttpStatus.forbidden);
      }

      return next();
    });
  };
}
