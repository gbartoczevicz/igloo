import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  CreateOrUpdateExamController,
  CreateOrUpdateExamUseCase,
} from "~/domain/usecases/create-or-update-exam";

export function setupCreateExam(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerOrProfessorAuthenticated: HttpMiddleware,
) {
  const usecase = new CreateOrUpdateExamUseCase(
    systemSetup.repositories.examsRepo,
    systemSetup.repositories.learningTrailStepsRepo,
  );

  const controller = new CreateOrUpdateExamController(
    systemSetup.factories.examFactory,
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/exams",
    Method.post,
    (req, res, _next) => {
      const content = {
        ...req.body,
        institutionId: req.institutionId,
      };

      controller.execute(content).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, managerOrProfessorAuthenticated],
  );
}
