import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetUsersController } from "~/domain/controllers";
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
    (req, res, _next) => {
      controller.execute(req.authenticatedUserIn).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, isUserAManager],
  );
}
