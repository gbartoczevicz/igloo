import { Controller, HttpStatus, Result } from "~/contracts";
import { CreateUserIn, CreateUserOut } from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";
import { DomainError } from "~/errors";

export class CreateUserController implements Controller {
  public constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(incoming: any): Promise<Result> {
    try {
      const userIn = new CreateUserIn(
        incoming.name,
        incoming.surname,
        incoming.email,
        incoming.phone,
        incoming.password,
      );Result

      const user = await this.createUserUseCase.create(userIn);
Result
      const userOut = new CreateUserOut(user);

      return new Result(HttpStatus.created, userOut);
    } catch (err) {
      if (err instanceof DomainError) {
        return new Result(HttpStatus.badRequest, err.message);
      }

      return new Result(HttpStatus.internalError);
    }
  }
}
