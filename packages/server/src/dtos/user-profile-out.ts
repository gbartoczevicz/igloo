import { OutDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";

export class UserProfileOut extends OutDTO<User> {
  public constructor(outcoming: User) {
    super(outcoming);
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
