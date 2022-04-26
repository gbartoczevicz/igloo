import { HttpResult } from "~/contracts/presentation";
import { Controller } from "../contracts/presentation/controller";
import { GetSelfAuthenticatedUserDTO } from "./get-self-authenticated-user-dto";

export class GetSelfAuthenticatedUserController extends Controller {
  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingUser = GetSelfAuthenticatedUserDTO.In.create(incoming);

    const outcoming = GetSelfAuthenticatedUserDTO.Out.toRaw(incomingUser.user);

    return this.onOk(outcoming);
  }
}
