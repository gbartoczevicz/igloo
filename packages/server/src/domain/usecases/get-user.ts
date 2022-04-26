import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";
import { Id } from "../entities/values";

type Params = {
  id: Id;
};

export class GetUserUseCase {
  private readonly usersRepo: UsersRepo;

  public constructor(usersRepo: UsersRepo) {
    this.usersRepo = usersRepo;
  }

  public async execute(incoming: Params): Promise<User | null> {
    return await this.usersRepo.findById(incoming.id);
  }
}
