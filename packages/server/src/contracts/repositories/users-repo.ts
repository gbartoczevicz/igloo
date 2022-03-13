import { User } from "~/domain/entities";
import { Email, Phone } from "~/domain/entities/values";

export interface UsersRepo {
  findByEmail(email: Email): Promise<User | undefined>;
  findByPhone(phone: Phone): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
