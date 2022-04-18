import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { AuthenticateUserUseCase } from "../usecases";

export class AuthenticateUserController
  extends P.Controller<D.AuthenticateUserIn, D.AuthenticateUserOut> {
  private readonly usecase: AuthenticateUserUseCase;

  public constructor(usecase: AuthenticateUserUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.AuthenticateUserIn,
  ): Promise<P.HttpResult<D.AuthenticateUserOut>> {
    const authenticatedUser = await this.usecase.execute(incoming.token);

    const outcoming = new D.AuthenticateUserOut(authenticatedUser);

    return this.onOk(outcoming);
  }
}
