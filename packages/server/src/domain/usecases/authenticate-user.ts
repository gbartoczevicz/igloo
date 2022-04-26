import { UsersRepo } from "~/contracts/database/repositories";
import { TokenProvider } from "~/contracts/hash";
import { UnauthorizedError } from "~/errors";
import { User } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  token: string;
};

export class AuthenticateUserUseCase {
  private readonly tokenProvider: TokenProvider;

  private readonly idFactory: IdFactory;

  private readonly usersRepo: UsersRepo;

  public constructor(
    tokenProvider: TokenProvider,
    idFactory: IdFactory,
    usersRepo: UsersRepo,
  ) {
    this.idFactory = idFactory;
    this.usersRepo = usersRepo;
    this.tokenProvider = tokenProvider;
  }

  public async execute(incoming: Params): Promise<User> {
    if (!incoming.token) {
      throw new UnauthorizedError("Invalid bearer token");
    }

    const [, bearerToken] = incoming.token.split(" ");

    let decoded: any;

    try {
      decoded = this.tokenProvider.decode(bearerToken) as any;
    } catch (err) {
      const error = new UnauthorizedError("Error when decoding token");

      console.info(error.message, err);

      throw error;
    }

    const userId = this.idFactory.create(decoded.userId);

    const userFound = await this.usersRepo.findById(userId);

    if (!userFound) {
      throw new UnauthorizedError("User not found");
    }

    return userFound;
  }
}
