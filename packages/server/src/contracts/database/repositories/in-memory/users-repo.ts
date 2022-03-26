import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "~/domain/entities";
import { Email, Id, Phone } from "~/domain/entities/values";

export class UsersRepoInMemory implements UsersRepo {
  private readonly users: User[];

  public constructor(users: User[]) {
    this.users = users;
  }

  public async findById(id: Id): Promise<User | null> {
    const foundById = this.users.find((u) => u.id.isEqual(id)) || null;

    return Promise.resolve(foundById);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const foundByEmail =
      this.users.find((u) => u.email.toString() === email.toString()) || null;

    return Promise.resolve(foundByEmail);
  }

  public async findByPhone(phone: Phone): Promise<User | null> {
    const foundByPhone =
      this.users.find((u) => u.phone.toString() === phone.toString()) || null;

    return Promise.resolve(foundByPhone);
  }

  public async save(user: User): Promise<void> {
    const foundPositionById = this.users.findIndex((u) =>
      u.id.isEqual(user.id)
    );

    if (foundPositionById !== -1) {
      this.users[foundPositionById] = user;
    } else {
      this.users.push(user);
    }

    return Promise.resolve();
  }
}
