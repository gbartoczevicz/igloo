import { UsersRepo } from "~/contracts/database/repositories";
import { PasswordHandler } from "~/contracts/hash";
import { CreateSessionIn } from "~/dtos";
import { SessionToken } from "../entities";
import { EmailFactory } from "../factories";

export class CreateSessionUseCase {
  private readonly emailFactory: EmailFactory;

  private readonly usersRepo: UsersRepo;

  private readonly passwordHandler: PasswordHandler;

  private readonly tokenFactory: TokenFactory;

  public constructor(
    emailFactory: EmailFactory,
    usersRepo: UsersRepo,
    passwordHandler: PasswordHandler,
    tokenFactory: TokenFactory,
  ) {
    this.emailFactory = emailFactory;
    this.usersRepo = usersRepo;
    this.passwordHandler = passwordHandler;
    this.tokenFactory = tokenFactory;
  }

  public async create(incoming: CreateSessionIn): Promise<SessionToken> {
    const email = this.emailFactory.create(incoming.email);

    const userFound = await this.usersRepo.findByEmail(email);

    if (!userFound) {
      throw new Error("Invalid credentials");
    }

    const isTheSame = this.passwordHandler.compare(
      incoming.password,
      userFound.password.toString(),
    );

    if (!isTheSame) {
      throw new Error("Invalid credentials");
    }

    return this.tokenFactory.create(userFound);
  }
}
