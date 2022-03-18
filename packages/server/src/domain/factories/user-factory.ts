import { User } from "~/domain/entities";
import { CreateUserIn } from "~/dtos";
import { Factory } from "~/contracts/domain";
import * as Factories from "~/domain/factories";

export class UserFactory implements Factory<CreateUserIn, User> {
  public constructor(
    public readonly idFactory: Factories.IdFactory,
    public readonly emailFactory: Factories.EmailFactory,
    public readonly passwordFactory: Factories.PasswordFactory,
    public readonly phoneFactory: Factories.PhoneFactory,
  ) {}

  public create(incoming: CreateUserIn): User {
    const id = this.idFactory.create();
    const email = this.emailFactory.create(incoming.email);
    const password = this.passwordFactory.create(incoming.password);
    const phone = this.phoneFactory.create(incoming.email);

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
