import { User } from "~/domain/entities";
import * as Factories from "~/domain/factories";

type Params = {
  id?: string;
  name: string;
  surname: string | null;
  email: string;
  password: string;
  phone: string;
};

export class UserFactory {
  public readonly idFactory: Factories.IdFactory;

  public readonly emailFactory: Factories.EmailFactory;

  public readonly passwordFactory: Factories.PasswordFactory;

  public readonly phoneFactory: Factories.PhoneFactory;

  public constructor(
    idFactory: Factories.IdFactory,
    emailFactory: Factories.EmailFactory,
    passwordFactory: Factories.PasswordFactory,
    phoneFactory: Factories.PhoneFactory,
  ) {
    this.idFactory = idFactory;
    this.emailFactory = emailFactory;
    this.passwordFactory = passwordFactory;
    this.phoneFactory = phoneFactory;
  }

  public toEntity(incoming: Params): User {
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

  public toPresentation(user: User) {
    return {
      id: user.id.value,
      name: user.name,
      surname: user.surname,
      email: user.email.toString(),
      phone: user.phone.toString(),
    };
  }
}
