import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  ListLearningTrailStepsController,
  ListLearningTrailStepsUseCase,
} from "~/domain/usecases/list-learning-trail-steps";

export function setupListLearningTrailSteps(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListLearningTrailStepsUseCase(
    systemSetup.repositories.learningTrailsRepo,
    systemSetup.repositories.learningTrailStepsRepo,
  );

  const controller = new ListLearningTrailStepsController(
    systemSetup.factories.idFactory,
    systemSetup.factories.learningTrailStepFactory,
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/learning-trails/:learningTrailId/learning-trail-steps",
    Method.get,
    (req, res, _next) => {
      controller.execute({ ...req.params, institutionId: req.institutionId })
        .then((result) => res.status(result.status).json(result.content));
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
