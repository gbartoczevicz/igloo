import { Prisma, PrismaClient, User as PrismaUser } from "@prisma/client";
import { BaseRepo, UsersRepo } from "~/contracts/repositories";
import { User } from "~/domain/entities";
import { Email, Id, Password, Phone } from "~/domain/entities/values";

export class PrismaUsersRepo extends BaseRepo<PrismaClient, PrismaUser, User>
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

    return this.toEntity(foundUser);
  }

  public async findByPhone(phone: Phone): Promise<User | undefined> {
    const foundUser = await this.client.user.findUnique({
      where: { phone: phone.toString() },
    });

    if (!foundUser) return undefined;

    return this.toEntity(foundUser);
  }

  protected toEntity(persisted: PrismaUser): User {
    const {
      id,
      name,
      surname,
      email,
      phone,
      password,
    } = persisted;

    return new User(
      new Id(id),
      name,
      surname,
      new Email(email),
      new Password(password),
      new Phone(phone),
    );
  }
}
