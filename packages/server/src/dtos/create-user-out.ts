import { User } from "~/domain/entities";
import { Out } from "./out";

export class CreateUserOut extends Out {
  public constructor(private readonly user: User) {
    super();
  }

  public toRaw(): unknown {
    return {
      id: this.user.id.value,
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email.toString(),
      phone: this.user.phone.toString(),
    };
  }
}
