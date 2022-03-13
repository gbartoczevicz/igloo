import { Password } from "~/domain/entities/values";

export abstract class PasswordHandler {
  protected readonly hashSalt: string;

  public constructor(hashSalt: string) {
    this.hashSalt = hashSalt;
  }

  abstract encode(value: string): Password;
  abstract compare(value1: string, value2: string): boolean;
}
