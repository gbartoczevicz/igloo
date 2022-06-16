import { Controller, HttpResult } from "~/contracts/presentation";
import { GetUserInstitutionRolesUseCase } from "~/domain/usecases";
import { UserRelatedToInstitutionDTO } from "./user-related-to-institution-dto";

export class UserRelatedToInstitutionController extends Controller {
  private readonly usecase: GetUserInstitutionRolesUseCase;

  public constructor(usecase: GetUserInstitutionRolesUseCase) {
    super();
    this.usecase = usecase;
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

    return this.onOk(undefined);
  }
}
