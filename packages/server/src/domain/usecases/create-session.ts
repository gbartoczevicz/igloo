import { UsersRepo } from "~/contracts/database/repositories";
import { PasswordHandler } from "~/contracts/hash";
import * as Errors from "~/domain/errors";
import { SessionToken } from "../entities";
import { EmailFactory, SessionTokenFacotry } from "../factories";

type Params = {
  email: string;
  password: string;
};

export class CreateSessionUseCase {
  private readonly emailFactory: EmailFactory;

  private readonly usersRepo: UsersRepo;

  private readonly passwordHandler: PasswordHandler;

  private readonly tokenFactory: SessionTokenFacotry;

  public constructor(
    emailFactory: EmailFactory,
    usersRepo: UsersRepo,
    passwordHandler: PasswordHandler,
    tokenFactory: SessionTokenFacotry,
  ) {
    this.emailFactory = emailFactory;
    this.usersRepo = usersRepo;
    this.passwordHandler = passwordHandler;
    this.tokenFactory = tokenFactory;
  }

  public async create(incoming: Params): Promise<SessionToken> {
    const email = this.emailFactory.create(incoming.email);

    const userFound = await this.usersRepo.findByEmail(email);

    if (!userFound) {
      throw new Errors.UserNotFound();
    }

    const isTheSame = this.passwordHandler.compare(
      incoming.password,
      userFound.password.toString(),
    );

    if (!isTheSame) {
      throw new Errors.PasswordNotMatch();
    }

    return this.tokenFactory.create(userFound);
  }
}
