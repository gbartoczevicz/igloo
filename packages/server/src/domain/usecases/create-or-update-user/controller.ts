import { Controller, HttpResult } from "~/contracts/presentation";
import { UserFactory } from "~/domain/factories";

import { CreateOrUpdateUserUseCase } from "./usecase";

export class CreateOrUpdateUserController extends Controller {
  public constructor(
    private readonly usecase: CreateOrUpdateUserUseCase,
    private readonly factory: UserFactory,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const user = this.factory.toEntity(incoming as any);

    await this.usecase.execute(user);

    return this.onCreated(
      this.factory.toPresentation(user),
    );
  }
}
