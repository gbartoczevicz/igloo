import { Controller } from "./controller";
import { AuthenticateManagerUseCase } from "~/domain/usecases";
import { AuthenticateManagerDTO } from "./authenticate-manager-dto";
import { HttpResult } from "~/contracts/presentation";

export class AuthenticateManagerController extends Controller {
  private readonly usecase: AuthenticateManagerUseCase;

  public constructor(usecase: AuthenticateManagerUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingManager = AuthenticateManagerDTO.In.create(incoming);

    const authenticatedManager = await this.usecase.execute(incomingManager);

    const outcoming = AuthenticateManagerDTO.Out.toRaw(authenticatedManager);

    return this.onOk(outcoming);
  }
}
