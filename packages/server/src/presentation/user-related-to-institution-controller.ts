import { Controller, HttpResult } from "~/contracts/presentation";
import { Id } from "~/domain/entities/values";
import { IdFactory } from "~/domain/factories";
import { GetUserInstitutionRolesUseCase } from "~/domain/usecases";
import { UserRelatedToInstitutionDTO } from "./user-related-to-institution-dto";

export class UserRelatedToInstitutionController extends Controller {
  public constructor(
    private readonly usecase: GetUserInstitutionRolesUseCase,
    private readonly idFactory: IdFactory,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const incomingUserAndInstitution = UserRelatedToInstitutionDTO.In.create(
      incoming,
    );

    const {
      manager,
      professor,
      student,
    } = await this.usecase.execute(incomingUserAndInstitution);

    if (!manager && !professor && !student) {
      return this.onForbidden();
    }

    const id = this.idFactory.create(incomingUserAndInstitution.institutionId);

    return this.onOk(id);
  }
}
