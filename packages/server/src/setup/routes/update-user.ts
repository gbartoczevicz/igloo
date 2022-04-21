import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { UpdateUserController } from "~/presentation";
import { UpdateUserUseCase } from "~/domain/usecases";

export function setupUpdateUser(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
) {
  const usecase = new UpdateUserUseCase(
    systemSetup.factories.userFactory,
    systemSetup.repositories.usersRepo,
  );

  const controller = new UpdateUserController(usecase);

  return new HttpRoute(
    "/profile",
    Method.put,
    (req, res, _next) => {
      controller.execute(req.updateUser).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated],
  );
}
