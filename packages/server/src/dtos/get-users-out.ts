import { OutDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";

export class GetUsersOut extends OutDTO<User[]> {
  public constructor(outcoming: User[]) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming.map((o) => ({
      id: o.id.value,
      name: o.name,
      surname: o.surname,
      email: o.email.toString(),
      phone: o.phone.toString(),
    }));
  }
}
