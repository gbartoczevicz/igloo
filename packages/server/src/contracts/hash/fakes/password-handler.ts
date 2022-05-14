import { Password } from "~/domain/entities/values";
import { PasswordHandler } from "../password-handler";

export class FakePasswordHandler extends PasswordHandler {
  public compare(_plain: string, _encoded: string): boolean {
    return true;
  }

  public encode(_plain: string): Password {
    return new Password("encoded");
  }
}
