import { NodeIdProvider } from "~/adapters/hash";
import { HttpRoute } from "~/adapters/http";
import { IdProvider } from "~/contracts/hash";
import { Method } from "~/contracts/http";
import { UsersRepo } from "~/contracts/repositories";
import { CreateUserController } from "~/domain/controllers";
import { UserFactory } from "~/domain/factories";
import { CreateUserUseCase } from "~/domain/usecases";

const idProvider: IdProvider = new NodeIdProvider();

const userFactory: UserFactory = {} as UserFactory;
const usersRepo: UsersRepo = {} as UsersRepo;

const createUserUseCase = new CreateUserUseCase(userFactory, usersRepo);
const controller = new CreateUserController(
  createUserUseCase,
);

export function setupCreateUsers() {
  return new HttpRoute(
    "/users",
    Method.post,
    (req, res, next) => {
      controller.execute((req as any).user).then((result) =>
        res.status(result.status).json(result.content)
      );

      next();
    },
  );
}
