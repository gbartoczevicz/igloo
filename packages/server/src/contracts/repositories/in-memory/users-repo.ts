import { UsersRepo } from "~/contracts/repositories";
import { User } from "~/domain/entities";
import { Email, Phone } from "~/domain/entities/values";

export class UsersRepoInMemory implements UsersRepo {
  private readonly users: User[];

  public constructor(users: User[]) {
    this.users = users;
  }

  public async findByEmail(email: Email): Promise<User | undefined> {
    const foundByEmail = this.users.find((u) =>
      u.email.toString() === email.toString()
    );

    return Promise.resolve(foundByEmail);
  }

  public async findByPhone(phone: Phone): Promise<User | undefined> {
    const foundByPhone = this.users.find((u) =>
      u.phone.toString() === phone.toString()
    );

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
