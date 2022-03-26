import { OutDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";

export class AuthenticateUserOut extends OutDTO<User> {
  public constructor(outcoming: User) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming;
  }
}
