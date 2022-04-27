import { Controller, HttpResult } from "~/contracts/presentation";
import { GetManagedInstitutionsUseCase } from "~/domain/usecases";
import { GetManagedInstitutionsDTO } from "./get-managed-institutions-dto";

export class GetManagedInstitutionsController extends Controller {
  private readonly usecase: GetManagedInstitutionsUseCase;

  public constructor(usecase: GetManagedInstitutionsUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingUser = GetManagedInstitutionsDTO.In.create(incoming);

    const institutionsFound = await this.usecase.execute(incomingUser);

    const outcoming = GetManagedInstitutionsDTO.Out.toRaw(institutionsFound);

    return this.onOk(outcoming);
  }
}
