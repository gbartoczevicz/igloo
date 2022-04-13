import { UsersRepo } from "~/contracts/database/repositories";
import { CreateUserIn } from "~/dtos";
import { UserFactory } from "~/domain/factories/user-factory";
import { User } from "~/domain/entities";
import { DomainError } from "~/errors";

export class CreateUserUseCase {
  public constructor(
    private readonly userFactory: UserFactory,
    private readonly usersRepo: UsersRepo,
  ) {}

  public async create(incoming: CreateUserIn): Promise<User> {
    const user = this.userFactory.create({
      name: incoming.name,
      surname: incoming.surname,
      email: incoming.email,
      phone: incoming.phone,
      password: incoming.password,
    });

    const emailAlreadyInUse = await this.usersRepo.findByEmail(user.email);

    if (emailAlreadyInUse) {
      throw new DomainError("E-mail is already in use");
    }

    const phoneAlreadyInUse = await this.usersRepo.findByPhone(user.phone);

    if (phoneAlreadyInUse) {
      throw new DomainError("Phone is already in use");
    }

    await this.usersRepo.save(user);

    return user;
  }
}
