import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  ListInstitutionLearningTrailsController,
  ListInstitutionLearningTrailsUseCase,
} from "~/domain/usecases/list-institution-learning-trails";

export function setupListInstitutionLearningTrails(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListInstitutionLearningTrailsUseCase(
    systemSetup.repositories.learningTrailsRepo,
  );

  const controller = new ListInstitutionLearningTrailsController(
    usecase,
    systemSetup.factories.learningTrailFactory,
  );

  return new HttpRoute(
    "/institutions/:institutionId/learning-trails",
    Method.get,
    (req, res, _next) => {
      controller.execute(req.params).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
