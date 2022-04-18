import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { UpdateUserUseCase } from "~/domain/usecases";

export class UpdateUserController
  extends P.Controller<D.UpdateUserIn, D.UpdateUserOut> {
  private readonly usecase: UpdateUserUseCase;

  public constructor(
    usecase: UpdateUserUseCase,
  ) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.UpdateUserIn,
  ): Promise<P.HttpResult<D.UpdateUserOut>> {
    const userUpdated = await this.usecase.execute(incoming);

    const outcoming = new D.UpdateUserOut(userUpdated);

    return this.onOk(outcoming);
  }
}
