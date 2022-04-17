import { HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateUserController } from "~/presentation/create-user-controller";
import { CreateUserUseCase } from "~/domain/usecases";

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
      controller.execute(req.body).then((result) =>
        res.status(result.status).json(result.content)
      );
    }
  );
}
