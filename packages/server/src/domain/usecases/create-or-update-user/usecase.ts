import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "~/domain/entities";

import Errors from "./errors";

export class CreateOrUpdateUserUseCase {
  public constructor(
    private readonly usersRepo: UsersRepo,
  ) {}

  public async execute(user: User): Promise<void> {
    if (await this.isEmailAlreadyInUse(user)) {
      throw new Errors.EmailAlreadyInUse();
    }

    if (await this.isPhoneAlreadyInUse(user)) {
      throw new Errors.PhoneAlreadyInUse();
    }

    await this.usersRepo.save(user);
  }

  private async isEmailAlreadyInUse(user: User): Promise<boolean> {
    const userFound = await this.usersRepo.findByEmail(user.email);

    if (!userFound) {
      return false;
    }

    return !userFound.id.isEqual(user.id) &&
      userFound.email.toString() === user.email.toString();
  }

  private async isPhoneAlreadyInUse(user: User): Promise<boolean> {
    const userFound = await this.usersRepo.findByPhone(user.phone);

    if (!userFound) {
      return false;
    }

    return !userFound.id.isEqual(user.id) &&
      userFound.phone.toString() === user.phone.toString();
  }
}
