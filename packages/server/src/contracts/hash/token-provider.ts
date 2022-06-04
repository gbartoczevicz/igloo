export abstract class TokenProvider {
  protected readonly secret: string;

  protected readonly expiresAt: string | number;

  public constructor(secret: string, expiresAt: string | number) {
    this.secret = secret;
    this.expiresAt = expiresAt;
  }

  public abstract encode(content: object): string;
  public abstract decode(plain: string): object;
}
