import { HttpResult } from "~/contracts/presentation";
import { CreateSessionUseCase } from "~/domain/usecases";
import { Controller } from "../contracts/presentation/controller";
import { CreateUserSessionDTO } from "./create-user-session-dto";

export class CreateSessionController extends Controller {
  private readonly usecase: CreateSessionUseCase;

  public constructor(useCase: CreateSessionUseCase) {
    super();

    this.usecase = useCase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingCredentials = CreateUserSessionDTO.In.create(incoming);

    const sessionCreated = await this.usecase.create(incomingCredentials);

    const outcoming = CreateUserSessionDTO.Out.toRaw(sessionCreated);

    return this.onCreated(outcoming);
  }
}
