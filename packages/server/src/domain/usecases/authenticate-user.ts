import { UsersRepo } from "~/contracts/database/repositories";
import { TokenProvider } from "~/contracts/hash";
import { AuthenticationError } from "~/errors";
import { User } from "../entities";
import { IdFactory } from "../factories";

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

  public async execute(incoming: string): Promise<User> {
    if (!incoming) {
      throw new AuthenticationError("Invalid bearer token");
    }

    const [, bearerToken] = incoming.split(" ");

    let decoded: any;

    try {
      decoded = this.tokenProvider.decode(bearerToken) as any;
    } catch (err) {
      const error = new AuthenticationError("Error when decoding token");

      console.info(error.message, err);

      throw error;
    }

    const userId = this.idFactory.create(decoded.userId);

    const userFound = await this.usersRepo.findById(userId);

    if (!userFound) {
      throw new AuthenticationError("User not found");
    }

    return userFound;
  }
}
