import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  CreateOrUpdateLearningTrailController,
  CreateOrUpdateLearningTrailUseCase,
} from "~/domain/usecases/create-or-update-learning-trail";

export function setupCreateLearningTrail(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerOrProfessorAuthenticated: HttpMiddleware,
) {
  const usecase = new CreateOrUpdateLearningTrailUseCase(
    systemSetup.repositories.disciplinesRepo,
    systemSetup.repositories.learningTrailsRepo,
  );

  const controller = new CreateOrUpdateLearningTrailController(
    systemSetup.factories.learningTrailFactory,
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/learning-trails",
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
