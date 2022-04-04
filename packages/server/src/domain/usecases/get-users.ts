import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";

export class GetUsersUseCase {
  private readonly usersRepo: UsersRepo;

  public constructor(usersRepo: UsersRepo) {
    this.usersRepo = usersRepo;
  }

  public async execute(): Promise<User[]> {
    return await this.usersRepo.findAll();
  }
}
