import { Controller } from "../contracts/presentation/controller";
import { AuthenticateUserUseCase } from "~/domain/usecases";
import { AuthenticateUserDTO } from "./authenticate-user-dto";
import { HttpResult } from "~/contracts/presentation";

export class AuthenticateUserController extends Controller {
  private readonly usecase: AuthenticateUserUseCase;

  public constructor(usecase: AuthenticateUserUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingToken = AuthenticateUserDTO.In.create(incoming);

    const authenticatedUser = await this.usecase.execute(incomingToken.token);

    const outcoming = AuthenticateUserDTO.Out.toRaw(authenticatedUser);

    return this.onOk(outcoming);
  }
}
