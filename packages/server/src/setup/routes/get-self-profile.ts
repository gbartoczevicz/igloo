import { HttpMiddleware, HttpRoute } from "~/adapters/http";
import { Method } from "~/contracts/http";
import { GetSelfAuthenticatedUserController } from "~/presentation";

export function setupGetSelfProfile(
  userAuthenticated: HttpMiddleware,
) {
  const controller = new GetSelfAuthenticatedUserController();

  return new HttpRoute(
    "/profile",
    Method.get,
    (req, res, _next) => {
      controller.execute({ user: req.currentUser }).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated],
  );
}
