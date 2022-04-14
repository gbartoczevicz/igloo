import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { UpdateUserController } from "~/domain/controllers";
import { UpdateUserUseCase } from "~/domain/usecases";
import { UpdateUserIn } from "~/dtos";

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
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, (req, res, next) => {
      const result = UpdateUserIn.create({
        ...req.body,
        id: req.authenticatedUserIn.user.id.value,
      });

      if (result instanceof UpdateUserIn) {
        req.updateUser = result;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
