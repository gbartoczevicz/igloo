import { User } from "~/domain/entities";
import { Factory } from "~/contracts/domain";
import * as Factories from "~/domain/factories";

export class UserFactory implements Factory<UserFactory.Params, User> {
  public constructor(
    public readonly idFactory: Factories.IdFactory,
    public readonly emailFactory: Factories.EmailFactory,
    public readonly passwordFactory: Factories.PasswordFactory,
    public readonly phoneFactory: Factories.PhoneFactory,
  ) {}

  public create(incoming: UserFactory.Params): User {
    const id = this.idFactory.create(incoming.id);
    const email = this.emailFactory.create(incoming.email);
    const password = this.passwordFactory.create(incoming.password);
    const phone = this.phoneFactory.create(incoming.phone);

    return new User(
      id,
      incoming.name,
      incoming.surname,
      email,
      password,
      phone,
    );
  }
}

namespace UserFactory {
  export type Params = {
    id?: string;
    name: string;
    surname: string | null;
    email: string;
    password: string;
    phone: string;
  };
}
