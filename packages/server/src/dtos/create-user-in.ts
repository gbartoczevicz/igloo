export class CreateUserIn {
  public readonly name: string;

  public readonly surname: string;

  public readonly email: string;

  public readonly phone: string;

  public readonly password: string;

  public constructor(
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
