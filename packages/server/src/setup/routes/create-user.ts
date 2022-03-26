import { HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateUserController } from "~/domain/controllers";
import { CreateUserUseCase } from "~/domain/usecases";
import { CreateUserIn } from "~/dtos";

export function setupCreateUsers(systemSetup: SystemSetup) {
  const usecase = new CreateUserUseCase(
    systemSetup.factories.userFactory,
    systemSetup.repositories.usersRepo,
  );
  const controller = new CreateUserController(usecase);

  return new HttpRoute(
    "/users",
    Method.post,
    (req, res, _next) => {
      controller.execute(req.createUser).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    (req, res, next) => {
      const result = CreateUserIn.create(req.body);

      if (result instanceof CreateUserIn) {
        req.createUser = result;

        return next();
      }

      res.status(result.status).json(
        result.content.map((c) => ({ [c.field]: c.message })),
      );
    },
  );
}
