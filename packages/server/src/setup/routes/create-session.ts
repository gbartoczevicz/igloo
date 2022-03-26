import { HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateSessionController } from "~/domain/controllers";
import { CreateSessionUseCase } from "~/domain/usecases";
import { CreateSessionIn } from "~/dtos";

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
      controller.execute(req.createSession).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    (req, res, next) => {
      const result = CreateSessionIn.create(req.body);

      if (result instanceof CreateSessionIn) {
        req.createSession = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    },
  );
}

export { setupCreateSession };
