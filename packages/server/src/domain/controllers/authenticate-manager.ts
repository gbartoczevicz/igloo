import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { AuthenticateManagerUseCase } from "../usecases";

export class AuthenticateManagerController
  extends P.Controller<D.AuthenticateManagerIn, D.AuthenticateManagerOut> {
  private readonly usecase: AuthenticateManagerUseCase;

  public constructor(usecase: AuthenticateManagerUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.AuthenticateManagerIn,
  ): Promise<P.HttpResult<D.AuthenticateManagerOut>> {
    const authenticatedManager = await this.usecase.execute(incoming);

    const outcoming = new D.AuthenticateManagerOut(authenticatedManager);

    return this.onOk(outcoming);
  }
}
