import { Email, Id, Password, Phone } from "./values";

export class User {
  public readonly id: Id;

  public readonly name: string;

  public readonly surname: string;

  public readonly email: Email;

  public readonly password: Password;

  public readonly phone: Phone;

  public constructor(
    id: Id,
    name: string,
    surname: string,
    email: Email,
    password: Password,
    phone: Phone,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
