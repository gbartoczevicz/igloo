import { TokenProvider } from "~/contracts/hash";
import { SessionToken, User } from "../entities";

export class SessionTokenFacotry {
  private readonly tokenProvider: TokenProvider;

  public constructor(tokenProvider: TokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  public create(incoming: User): SessionToken {
    const token = this.tokenProvider.encode({ userId: incoming.id.value });

    return new SessionToken(token, incoming.id);
  }
}
