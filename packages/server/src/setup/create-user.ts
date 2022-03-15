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

export function setupCreateUsers() {
  return new HttpRoute(
    "/users",
    Method.post,
    (req, res, next) => {
      const controller = new CreateUserController(
        createUserUseCase,
        (out) => res.status(200).json(out.toRaw()),
        (_) => res.sendStatus(500),
        (err) => res.status(400).json({ message: err.message }),
      );

      controller.execute((req as any).user);

      next();
    },
  );
}
