import * as P from "~/contracts/presentation";
import * as D from "~/dtos";

export class GetSelfProfileController extends P.Controller<D.AuthenticatedUserIn, D.UserProfileOut> {
  protected override async handle(incoming: D.AuthenticatedUserIn): Promise<P.Result<D.UserProfileOut>> {
    const outcoming = new D.UserProfileOut(incoming.user);

    return this.onOk(outcoming);
  }
}