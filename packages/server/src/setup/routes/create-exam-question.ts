import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import {
  CreateOrUpdateExamQuestionController,
  CreateOrUpdateExamQuestionUseCase,
} from "~/domain/usecases/create-or-update-exam-question";

export function setupCreateExamQuestion(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  managerOrProfessorAuthenticated: HttpMiddleware,
) {
  const usecase = new CreateOrUpdateExamQuestionUseCase(
    systemSetup.repositories.examQuestionsRepo,
    systemSetup.repositories.examsRepo,
  );

  const controller = new CreateOrUpdateExamQuestionController(
    systemSetup.factories.examQuestionFactory,
    usecase,
  );

  return new HttpRoute(
    "/institutions/:institutionId/exam-questions",
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
