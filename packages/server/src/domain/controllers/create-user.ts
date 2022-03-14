import { Controller, HttpStatus, Result } from "~/contracts/http";
import * as Presentation from "~/contracts/presentation";
import { CreateUserIn, CreateUserOut } from "~/dtos";
import { CreateUserUseCase } from "~/domain/usecases";
import { DomainError } from "~/errors";

export class CreateUserController implements Controller<CreateUserIn> {
  private readonly createUserUseCase: CreateUserUseCase;

  private readonly onSuccess: Presentation.OnSuccess;

  private readonly onDomainError: Presentation.OnDomainError;

  public constructor(
    createUserUseCase: CreateUserUseCase,
    onSuccess: Presentation.OnSuccess,
    onDomainError: Presentation.OnDomainError,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.onSuccess = onSuccess;
    this.onDomainError = onDomainError;
  }

  public async execute(incoming: CreateUserIn): Promise<void> {
    try {
      await this.createUserUseCase.create(incoming);

      return this.onSuccess();
    } catch (err) {
      if (err instanceof DomainError) {
        return this.onDomainError(err);
      }

      throw err;
    }
  }
}
