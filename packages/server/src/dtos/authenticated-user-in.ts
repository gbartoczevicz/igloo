import { InDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";

export class AuthenticatedUserIn extends InDTO {
  public readonly user: User;

  public constructor(user: User) {
    super();

    this.user = user;
  }
}
