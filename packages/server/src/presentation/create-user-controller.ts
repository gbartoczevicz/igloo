import { Result } from "~/contracts/presentation";
import { CreateUserUseCase } from "~/domain/usecases";
import { CreateUserDTO } from "./create-user-dto";
import { Controller } from "~/presentation/controller";

export class CreateUserController extends Controller {
  private readonly usecase: CreateUserUseCase;

  public constructor(usecase: CreateUserUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<Result<unknown>> {
    const toCreateUser = CreateUserDTO.In.create(incoming);

    if (toCreateUser.isRight()) {
      return this.onDomainError(toCreateUser.value);
    }

    const userCreated = await this.usecase.create(toCreateUser.value);

    const outcoming = CreateUserDTO.Out.toRaw(userCreated);

    return this.onCreated(outcoming);
  }
}
