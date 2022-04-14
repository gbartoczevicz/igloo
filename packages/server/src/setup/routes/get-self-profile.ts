import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { GetSelfProfileController } from "~/domain/controllers";

export function setupGetSelfProfile(
  userAuthenticated: HttpMiddleware,
) {
  const controller = new GetSelfProfileController();

  return new HttpRoute(
    "/profile",
    Method.get,
    (req, res, _next) => {
      controller.execute(req.authenticatedUserIn).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated],
  );
}
