import { Password } from "~/domain/entities/values";

export abstract class PasswordHandler {
  protected readonly hashSalt: string;

  public constructor(hashSalt: string) {
    this.hashSalt = hashSalt;
  }

  public isValid(value: string): boolean {
    if (!value || value.length < 8) {
      return false;
    }

    return true;
  }

  abstract encode(value: string): Password;
  abstract compare(value1: string, value2: string): boolean;
}
