import { Factory } from "~/contracts/domain";
import { TokenProvider } from "~/contracts/hash";
import { SessionToken, User } from "../entities";

export class SessionTokenFacotry implements Factory<User, SessionToken> {
  private readonly tokenProvider: TokenProvider;

  public constructor(tokenProvider: TokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  public create(incoming: User): SessionToken {
    const token = this.tokenProvider.encode({ userId: incoming.id.value });

    return new SessionToken(token, incoming.id);
  }
}
