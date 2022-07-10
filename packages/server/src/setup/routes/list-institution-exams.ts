import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  ListInstitutionExamsController,
  ListInstitutionExamsUseCase,
} from "~/domain/usecases/list-institution-exams";

export function setupListInstitutionExams(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListInstitutionExamsUseCase(
    systemSetup.repositories.examsRepo,
  );

  const controller = new ListInstitutionExamsController(
    usecase,
    systemSetup.factories.examFactory,
  );

  return new HttpRoute(
    "/institutions/:institutionId/exams",
    Method.get,
    (req, res, _next) => {
      controller.execute(req.params).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
