import { Controller, HttpResult } from "~/contracts/presentation";
import { User } from "~/domain/entities";
import { IdFactory } from "~/domain/factories";

import { AuthenticateManagerOrProfessorUseCase } from "./usecase";

export class AuthenticateManagerOrProfessorController extends Controller {
  public constructor(
    private readonly idFactory: IdFactory,
    private readonly usecase: AuthenticateManagerOrProfessorUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const { institutionId, user } = (incoming as any) || {};

    if (!(user instanceof User)) {
      return this.onUnauthorized();
    }

    const professorOrManager = await this.usecase.execute({
      institutionId: this.idFactory.create(institutionId),
      user,
    });

    return this.onOk(professorOrManager.institutionId.value);
  }
}
