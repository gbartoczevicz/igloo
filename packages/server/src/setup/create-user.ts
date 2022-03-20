import { BcryptPasswordHandler, NodeIdProvider } from "~/adapters/hash";
import { HttpRoute } from "~/adapters/http";
import { PrismaUsersRepo } from "~/adapters/database/repositories";
import { EmailValidatorImpl, PhoneValidatorImpl } from "~/adapters/validators";
import { IdProvider, PasswordHandler } from "~/contracts/hash";
import { Method } from "~/contracts/http";
import { UsersRepo } from "~/contracts/database/repositories";
import { EmailValidator, PhoneValidator } from "~/contracts/validators";
import { CreateUserController } from "~/domain/controllers";
import {
  EmailFactory,
  IdFactory,
  PasswordFactory,
  PhoneFactory,
  UserFactory,
} from "~/domain/factories";
import { CreateUserUseCase } from "~/domain/usecases";
import { CreateUserIn } from "~/dtos";
import { Database } from "~/components/database";
import { PrismaClient } from "@prisma/client";

export function setupCreateUsers(databaseLifecycle: Database<PrismaClient>) {
  const idProvider: IdProvider = new NodeIdProvider();
  const passwordHandler: PasswordHandler = new BcryptPasswordHandler(
    8,
  );
  const emailValidator: EmailValidator = new EmailValidatorImpl();
  const phoneValidator: PhoneValidator = new PhoneValidatorImpl();

  const idFactory = new IdFactory(idProvider);
  const passwordFactory = new PasswordFactory(passwordHandler);
  const emailFactory = new EmailFactory(emailValidator);
  const phoneFactory = new PhoneFactory(phoneValidator);

  const userFactory = new UserFactory(
    idFactory,
    emailFactory,
    passwordFactory,
    phoneFactory,
  );

  const usersRepo: UsersRepo = new PrismaUsersRepo(databaseLifecycle.client);

  const createUserUseCase = new CreateUserUseCase(userFactory, usersRepo);

  const controller = new CreateUserController(
    createUserUseCase,
  );

  return {
    idProvider,
    idFactory,
    passwordHandler,
    passwordFactory,
    emailValidator,
    emailFactory,
    phoneValidator,
    phoneFactory,
    usersRepo,
    createUserUseCase,
    createUsersController: controller,
    route: new HttpRoute(
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
    ),
  };
}
