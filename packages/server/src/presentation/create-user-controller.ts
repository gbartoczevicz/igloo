import { Result } from "~/contracts/presentation";
import { CreateUserUseCase } from "~/domain/usecases";
import { CommonErrorOut, CreateUserIn, CreateUserOut } from "~/dtos";
import { Controller } from "~/presentation/controller";

export class CreateUserController extends Controller {
  private readonly usecase: CreateUserUseCase;

  public constructor(usecase: CreateUserUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<Result<unknown>> {
    const toCreateUser = CreateUserIn.create(incoming);

    if (!(toCreateUser instanceof CreateUserIn)) {
      return this.onDomainError(new CommonErrorOut(toCreateUser.content));
    }

    const userCreated = await this.usecase.create(toCreateUser);

    const outcoming = new CreateUserOut(userCreated).toRaw();

    return this.onCreated(outcoming);
  }
}
