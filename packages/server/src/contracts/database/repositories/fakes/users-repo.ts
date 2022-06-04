import { User } from "~/domain/entities";
import { Email, Id, Phone } from "~/domain/entities/values";
import { UsersRepo } from "../users-repo";

export class FakeUsersRepo implements UsersRepo {
  public async findById(_id: Id): Promise<User | null> {
    return null;
  }

  public async findByEmail(_email: Email): Promise<User | null> {
    return null;
  }

  public async findByPhone(_phone: Phone): Promise<User | null> {
    return null;
  }

  public async findAllById(_ids: Id[]): Promise<User[]> {
    return [];
  }

  public async save(_user: User): Promise<void> {
  }

  public async findAll(): Promise<User[]> {
    return [];
  }
}
