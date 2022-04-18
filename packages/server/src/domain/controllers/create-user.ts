import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";
import { User } from "../entities";
export class CreateUserController
  extends P.Controller<D.CreateUserIn, D.CreateUserOut> {
  private readonly createUserUseCase: CreateUserUseCase;

  public constructor(
    createUserUseCase: CreateUserUseCase,
  ) {
    super();
    this.createUserUseCase = createUserUseCase;
  }

  protected override async handle(
    incoming: D.CreateUserIn,
  ): Promise<P.HttpResult<D.CreateUserOut>> {
    const userCreated = await this.createUserUseCase.create(incoming);

    const outcoming = new D.CreateUserOut(userCreated);

    return this.onCreated(outcoming);
  }
}
