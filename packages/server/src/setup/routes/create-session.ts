import { HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateSessionController } from "~/presentation";
import { CreateSessionUseCase } from "~/domain/usecases";

function setupCreateSession(systemSetup: SystemSetup) {
  const usecase = new CreateSessionUseCase(
    systemSetup.factories.emailFactory,
    systemSetup.repositories.usersRepo,
    systemSetup.hash.passwordHandler,
    systemSetup.factories.sessionTokenFactory,
  );
  const controller = new CreateSessionController(usecase);

  return new HttpRoute(
    "/sessions",
    Method.post,
    (req, res, _next) => {
      controller.execute(req.body).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
  );
}

export { setupCreateSession };
