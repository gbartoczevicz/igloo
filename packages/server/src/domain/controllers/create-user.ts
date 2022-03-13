import { Controller, HttpStatus, Result as R } from "~/contracts/http";
import { CreateUserIn, CreateUserOut } from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";
import { DomainError } from "~/errors";
import { User } from "~/domain/entities";

type Result = R<User>;

export class CreateUserController implements Controller<CreateUserIn, Result> {
  public constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  async execute(incoming: CreateUserIn): Promise<Result> {
    try {
      const user = await this.createUserUseCase.create(incoming);

      const out = new CreateUserOut(user);

      return new R(HttpStatus.created, out);
    } catch (err) {
      if (err instanceof DomainError) {
        return new R(HttpStatus.badRequest, err.message);
      }

      return new R(HttpStatus.internalError);
    }
  }
}
