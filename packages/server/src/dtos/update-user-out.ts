import { OutDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";

export class UpdateUserOut extends OutDTO<User> {
  public constructor(user: User) {
    super(user);
  }

  public toRaw(): unknown {
    return {
      id: this.outcoming.id.value,
      name: this.outcoming.name,
      surname: this.outcoming.surname,
      email: this.outcoming.email.toString(),
      phone: this.outcoming.phone.toString(),
    };
  }
}
