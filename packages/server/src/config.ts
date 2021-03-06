export class ApplicationConfig {
  private constructor(
    public readonly databaseUrl: string,
    public readonly hashSalt: number,
    public readonly tokenSecret: string,
    public readonly tokenExpiresAt: string | number,
    public readonly port: number,
  ) {}

  public static create() {
    const databaseUrl = process.env.DATABASE_URL as string;
    const hashSalt = Number(process.env.HASH_SALT);
    const tokenSecret = process.env.TOKEN_SECRET as string;
    const tokenExpiresAt = process.env.TOKEN_EXPIRES_AT as string | number;
    const port = Number(process.env.PORT);

    return new ApplicationConfig(
      databaseUrl,
      hashSalt,
      tokenSecret,
      tokenExpiresAt,
      port,
    );
  }
}

export const config = ApplicationConfig.create();
