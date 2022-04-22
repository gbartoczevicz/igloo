import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetUsersController } from "~/presentation";
import { GetUsersUseCase } from "~/domain/usecases";

export function setupGetUsersAsManager(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
  isUserAManager: HttpMiddleware,
) {
  const getUsersUseCase = new GetUsersUseCase(
    systemSetup.repositories.usersRepo,
  );

  const controller = new GetUsersController(
    getUsersUseCase,
  );

  return new HttpRoute(
    "/users",
    Method.get,
    (_req, res, _next) => {
      controller.execute({}).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated, isUserAManager],
  );
}
