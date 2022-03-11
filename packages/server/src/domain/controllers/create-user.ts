import { Controller, HttpStatus, Response } from "~/contracts";
import { CreateUserIn, CreateUserOut } from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";
import { DomainError } from "~/errors";

export class CreateUserController implements Controller {
  public constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(incoming: any): Promise<Response> {
    try {
      const userIn = new CreateUserIn(
        incoming.name,
        incoming.surname,
        incoming.email,
        incoming.phone,
        incoming.password,
      );

      const user = await this.createUserUseCase.create(userIn);

      const userOut = new CreateUserOut(user);

      return new Response(HttpStatus.created, userOut);
    } catch (err) {
      if (err instanceof DomainError) {
        return new Response(HttpStatus.badRequest, err.message);
      }

      return new Response(HttpStatus.internalError);
    }
  }
}
