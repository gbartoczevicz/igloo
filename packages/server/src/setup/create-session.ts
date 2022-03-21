import { PrismaClient } from "@prisma/client";
import { PrismaUsersRepo } from "~/adapters/database/repositories";
import { BcryptPasswordHandler, JwtTokenProvider } from "~/adapters/hash";
import { HttpRoute } from "~/adapters/http";
import { EmailValidatorImpl } from "~/adapters/validators";
import { Database } from "~/components/database";
import { UsersRepo } from "~/contracts/database/repositories";
import { PasswordHandler, TokenProvider } from "~/contracts/hash";
import { Method } from "~/contracts/http";
import { EmailValidator } from "~/contracts/validators";
import { CreateSessionController } from "~/domain/controllers";
import { EmailFactory, SessionTokenFacotry } from "~/domain/factories";
import { CreateSessionUseCase } from "~/domain/usecases";
import { CreateSessionIn } from "~/dtos";

function setupCreateSession(databaseLifecycle: Database<PrismaClient>) {
  const tokenProvider: TokenProvider = new JwtTokenProvider(
    "igoo_secret_token",
    "1h",
  );
  const tokenFactory = new SessionTokenFacotry(tokenProvider);
  const passwordHandler: PasswordHandler = new BcryptPasswordHandler(8);
  const usersRepo: UsersRepo = new PrismaUsersRepo(databaseLifecycle.client);
  const emailValidator: EmailValidator = new EmailValidatorImpl();
  const emailFactory = new EmailFactory(emailValidator);
  const usecase = new CreateSessionUseCase(
    emailFactory,
    usersRepo,
    passwordHandler,
    tokenFactory,
  );
  const controller = new CreateSessionController(usecase);

  return {
    route: new HttpRoute(
      "/sessions",
      Method.post,
      (req, res, _next) => {
        controller.execute(req.createSession).then((result) =>
          res.status(result.status).json(result.content)
        );
      },
      (req, res, next) => {
        const result = CreateSessionIn.create(req.body);

        if (result instanceof CreateSessionIn) {
          req.createSession = result;

          return next();
        }

        return res.status(result.status).json(result.content.toRaw());
      },
    ),
  };
}

export { setupCreateSession };
