import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";
import { Id } from "../entities/values";

export class GetUserUseCase {
  private readonly usersRepo: UsersRepo;

  public constructor(usersRepo: UsersRepo) {
    this.usersRepo = usersRepo;
  }

  public async execute(id: Id): Promise<User | null> {
    return await this.usersRepo.findById(id);
  }
}
