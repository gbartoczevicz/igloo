import * as bcrypt from "bcrypt";
import { PasswordHandler } from "~/contracts/hash";
import { Password } from "~/domain/entities/values";

export class BcryptPasswordHandler extends PasswordHandler {
  public constructor(hashSalt: number) {
    super(hashSalt);
  }

  public encode(val: string): Password {
    const encoded = bcrypt.hashSync(val, this.hashSalt);

    return new Password(encoded);
  }

  public compare(plain: string, encoded: string): boolean {
    return bcrypt.compareSync(plain, encoded);
  }
}
