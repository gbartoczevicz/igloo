import {
  EmailValidator,
  Factory,
  PasswordHandler,
  PhoneValidator,
} from "~/contracts";
import { User } from "~/domain/entities";
import { Email, Phone } from "~/domain/entities/values";
import { CreateUserIn } from "~/dtos";
import { IdFactory } from "./id-factory";

export class UserFactory implements Factory<CreateUserIn, User> {
  public constructor(
    public readonly idFactory: IdFactory,
    public readonly emailValidator: EmailValidator,
    public readonly passwordHandler: PasswordHandler,
    public readonly phoneValidator: PhoneValidator,
  ) {}

  public create(incoming: CreateUserIn): User {
    const { name } = incoming;

    if (!name || name.length === 0) {
      throw new Error("Name is required");
    }

    if (!this.emailValidator.isValid(incoming.email)) {
      throw new Error("Email is invalid");
    }

    if (!this.phoneValidator.isValid(incoming.phone)) {
      throw new Error("Phone is invalid");
    }

    const isValidPassword = this.passwordHandler.isValid(incoming.password);

    if (!isValidPassword) {
      throw new Error("Password is invalid");
    }

    const id = this.idFactory.create();
    const email = new Email(incoming.email);
    const password = this.passwordHandler.encode(incoming.password);
    const phone = new Phone(incoming.phone);

    return new User(id, name, incoming.surname, email, password, phone);
  }
}
