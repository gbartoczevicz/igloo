import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  ListExamQuestionsController,
  ListExamQuestionsUseCase,
} from "~/domain/usecases/list-exam-questions";

export function setupListExamQuestions(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  userRelatedToInstitution: HttpMiddleware,
) {
  const usecase = new ListExamQuestionsUseCase(
    systemSetup.repositories.examsRepo,
    systemSetup.repositories.examQuestionsRepo,
  );

  const controller = new ListExamQuestionsController(
    usecase,
    systemSetup.factories.idFactory,
    systemSetup.factories.examQuestionFactory,
  );

  return new HttpRoute(
    "/institutions/:institutionId/exams/:examId/exam-questions",
    Method.get,
    (req, res, _next) => {
      controller.execute({ ...req.params, institutionId: req.institutionId })
        .then((result) => res.status(result.status).json(result.content));
    },
    [userAuthenticated, userRelatedToInstitution],
  );
}
