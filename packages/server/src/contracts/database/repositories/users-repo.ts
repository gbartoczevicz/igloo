import { User } from "~/domain/entities";
import { Email, Id, Phone } from "~/domain/entities/values";

export interface UsersRepo {
  findById(id: Id): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findByPhone(phone: Phone): Promise<User | null>;
  save(user: User): Promise<void>;
}
