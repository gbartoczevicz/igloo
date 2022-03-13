import { Factory } from "~/contracts/domain";
import { PasswordHandler } from "~/contracts/hash";
import { Password } from "~/domain/entities/values";

export class PasswordFactory implements Factory<string, Password> {
  private readonly passwordHandler: PasswordHandler;

  public constructor(passwordHandler: PasswordHandler) {
    this.passwordHandler = passwordHandler;
  }

  public create(incoming: string): Password {
    return this.passwordHandler.encode(incoming);
  }
}
