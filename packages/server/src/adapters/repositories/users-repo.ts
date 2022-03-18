import { PrismaClient } from "@prisma/client";
import { BaseRepo, UsersRepo } from "~/contracts/repositories";
import { User } from "~/domain/entities";
import { Email, Id, Password, Phone } from "~/domain/entities/values";

export class PrismaUsersRepo extends BaseRepo<PrismaClient>
  implements UsersRepo {
  public constructor(client: PrismaClient) {
    super(client);
  }

  public async save(user: User): Promise<void> {
    await this.client.user.upsert({
      create: {
        id: user.id.value,
        name: user.name,
        surname: user.surname,
        email: user.email.toString(),
        phone: user.phone.toString(),
        password: user.password.toString(),
      },
      update: {
        name: user.name,
        surname: user.surname,
        email: user.email.toString(),
        phone: user.phone.toString(),
        password: user.password.toString(),
      },
      where: { id: user.id.value },
    });
  }

  public async findByEmail(email: Email): Promise<User | undefined> {
    const foundUser = await this.client.user.findUnique({
      where: { email: email.toString() },
    });

    if (!foundUser) return undefined;

    const { id, name, password, phone, surname } = foundUser;

    return new User(
      new Id(id),
      name,
      email,
      new Password(password),
      new Phone(phone),
      surname || undefined,
    );
  }

  public async findByPhone(phone: Phone): Promise<User | undefined> {
    const foundUser = await this.client.user.findUnique({
      where: { phone: phone.toString() },
    });

    if (!foundUser) return undefined;

    const { id, name, password, email, surname } = foundUser;

    return new User(
      new Id(id),
      name,
      new Email(email),
      password,
      new Phone(phone),
      surname || undefined,
    );
  }
}
