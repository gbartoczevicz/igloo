import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  CreateOrUpdateLearningTrailStepController,
  CreateOrUpdateLearningTrailStepUseCase,
} from "~/domain/usecases/create-or-update-learning-trail-step";

export function setupCreateLearningTrailStep(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerOrProfessorAuthenticated: HttpMiddleware,
) {
  const usecase = new CreateOrUpdateLearningTrailStepUseCase(
    systemSetup.repositories.learningTrailsRepo,
    systemSetup.repositories.learningTrailStepsRepo,
  );

  const controller = new CreateOrUpdateLearningTrailStepController(
    systemSetup.factories.learningTrailStepFactory,
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/learning-trail-steps",
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
