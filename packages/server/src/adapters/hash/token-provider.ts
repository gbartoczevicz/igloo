import jwt from "jsonwebtoken";

import { TokenProvider } from "~/contracts/hash";
import { SessionToken } from "~/domain/entities";

export class JwtTokenProvider extends TokenProvider {
  public constructor(secret: string, expiresAt: string | number) {
    super(secret, expiresAt);
  }

  public encode(content: object): string {
    return jwt.sign(content, this.secret, {
      expiresIn: this.expiresAt,
    });
  }

  public decode(plain: string): object {
    return jwt.verify(plain, this.secret) as object;
  }
}
