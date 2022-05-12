import { Controller, HttpResult } from "~/contracts/presentation";
import { ListRelatedUserInstitutionsUseCase } from "~/domain/usecases";
import { ListRelatedUserInstitutionsDTO } from "./list-related-user-institutions-dto";

export class ListRelatedUserInstitutionsController extends Controller {
  private readonly usecase: ListRelatedUserInstitutionsUseCase;

  public constructor(usecase: ListRelatedUserInstitutionsUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const incomingUser = ListRelatedUserInstitutionsDTO.In.create(incoming);

    const relatedInstitutions = await this.usecase.execute(incomingUser);

    const outcoming = ListRelatedUserInstitutionsDTO.Out.toRaw(
      relatedInstitutions,
    );

    return this.onOk(outcoming);
  }
}
