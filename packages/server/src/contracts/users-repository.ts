import { User } from "~/domain/entities";
import { Email, Phone } from "~/domain/entities/values";

export abstract class UsersRepo<T> {
  protected readonly connection: T;

  public constructor(connection: T) {
    this.connection = connection;
  }

  abstract findByEmail(email: Email): Promise<User | undefined>;
  abstract findByPhone(phone: Phone): Promise<Phone | undefined>;
  abstract save(user: User): Promise<void>;
}