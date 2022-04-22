import { User } from "~/domain/entities";

export namespace GetUsersDTO {
  export class Out {
    public static toRaw(outcoming: User[]) {
      return outcoming.map((o) => ({
        id: o.id.value,
        name: o.name,
        surname: o.surname,
        email: o.email.toString(),
        phone: o.phone.toString(),
      }));
    }
  }
}
