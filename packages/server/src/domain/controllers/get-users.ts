import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { GetUsersUseCase } from "../usecases";

export class GetUsersController extends P.Controller<
  D.AuthenticatedUserIn,
  D.GetUsersOut
> {
  private readonly usecase: GetUsersUseCase;

  public constructor(usecase: GetUsersUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    _: D.AuthenticatedUserIn,
  ): Promise<P.Result<D.GetUsersOut>> {
    const usersFound = await this.usecase.execute();

    const outcoming = new D.GetUsersOut(usersFound);

    return this.onOk(outcoming);
  }
}
