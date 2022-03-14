import * as P from "~/contracts/presentation";
import { CreateUserIn, CreateUserOut } from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";

export class CreateUserController extends P.Controller<CreateUserIn> {
  private readonly createUserUseCase: CreateUserUseCase;

  private readonly onSuccess: P.OnCommonEvent<CreateUserOut>;

  public constructor(
    createUserUseCase: CreateUserUseCase,
    onSuccess: P.OnCommonEvent<CreateUserOut>,
    onInternalError: P.OnInternalError,
    onDomainError: P.OnDomainError,
  ) {
    super(onInternalError, onDomainError);

    this.createUserUseCase = createUserUseCase;
    this.onSuccess = onSuccess;
  }

  protected override async handle(incoming: CreateUserIn): Promise<void> {
    const userCreated = await this.createUserUseCase.create(incoming);

    return this.onSuccess(new CreateUserOut(userCreated));
  }
}
