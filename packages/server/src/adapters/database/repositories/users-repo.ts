import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { BaseRepo, UsersRepo } from "~/contracts/database/repositories";
import { User } from "~/domain/entities";
import { Email, Id, Password, Phone } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaUsersRepo extends BaseRepo<PrismaClient, PrismaUser, User>
  implements UsersRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(user: User): Promise<void> {
    await this.client.client.user.upsert({
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

  public async findById(id: Id): Promise<User | null> {
    const foundUser = await this.client.client.user.findUnique({
      where: { id: id.value },
    });

    return this.toEntity(foundUser);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const foundUser = await this.client.client.user.findUnique({
      where: { email: email.toString() },
    });

    return this.toEntity(foundUser);
  }

  public async findByPhone(phone: Phone): Promise<User | null> {
    const foundUser = await this.client.client.user.findUnique({
      where: { phone: phone.toString() },
    });

    return this.toEntity(foundUser);
  }

  protected toEntity(persisted: PrismaUser | null): User | null {
    if (!persisted) return null;

    return new User(
      new Id(persisted.id),
      persisted.name,
      persisted.surname,
      new Email(persisted.email),
      new Password(persisted.password),
      new Phone(persisted.phone),
    );
  }
}
