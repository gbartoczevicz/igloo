import { HttpResult } from "~/contracts/presentation";
import { CreateUserUseCase } from "~/domain/usecases";
import { CreateUserDTO } from "./create-user-dto";
import { Controller } from "~/presentation/controller";
import { CommonError } from "~/errors/common";

export class CreateUserController extends Controller {
  private readonly usecase: CreateUserUseCase;

  public constructor(usecase: CreateUserUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const toCreateUser = CreateUserDTO.In.create(incoming);

    if (toCreateUser.isRight()) {
      return this.onDomainError(CommonError.toRaw(toCreateUser.value));
    }

    const userCreated = await this.usecase.create(toCreateUser.value);

    const outcoming = CreateUserDTO.Out.toRaw(userCreated);

    return this.onCreated(outcoming);
  }
}
