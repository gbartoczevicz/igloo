import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { GetManagersByUserUseCase } from "../usecases";

export class GetManagersByUserController
  extends P.Controller<D.GetManagersByUserIn, D.GetManagersByUserOut> {
  private readonly usecase: GetManagersByUserUseCase;

  public constructor(usecase: GetManagersByUserUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.GetManagersByUserIn,
  ): Promise<P.Result<D.GetManagersByUserOut>> {
    const managersFound = await this.usecase.execute(incoming.user);

    const outcoming = new D.GetManagersByUserOut(managersFound);

    return this.onOk(outcoming);
  }
}
