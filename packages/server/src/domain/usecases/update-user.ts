import { UsersRepo } from "~/contracts/database/repositories";
import { User } from "../entities";
import { UserFactory } from "../factories";
import * as Errors from "~/domain/errors";

type Params = {
  id: string;
  name: string;
  surname: string | null;
  email: string;
  phone: string;
  password: string;
};

export class UpdateUserUseCase {
  private readonly usersFactory: UserFactory;

  private readonly usersRepo: UsersRepo;

  public constructor(usersFactory: UserFactory, usersRepo: UsersRepo) {
    this.usersFactory = usersFactory;
    this.usersRepo = usersRepo;
  }

  public async execute(incoming: Params): Promise<User> {
    const user = this.usersFactory.create(incoming);

    if (await this.isEmailAlreadyInUse(user)) {
      throw new Errors.EmailAlreadyInUse();
    }

    if (await this.isPhoneAlreadyInUse(user)) {
      throw new Errors.PhoneAlreadyInUse();
    }

    await this.usersRepo.save(user);

    return user;
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
