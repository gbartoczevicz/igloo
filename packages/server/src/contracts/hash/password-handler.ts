import { Password } from "~/domain/entities/values";

export abstract class PasswordHandler {
  protected readonly hashSalt: number;

  public constructor(hashSalt: number) {
    this.hashSalt = hashSalt;
  }

  abstract encode(plain: string): Password;
  abstract compare(plain: string, encoded: string): boolean;
}
