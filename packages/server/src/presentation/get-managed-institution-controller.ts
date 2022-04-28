import { Controller, HttpResult } from "~/contracts/presentation";
import { GetManagedInstitutionUseCase } from "~/domain/usecases";
import { GetManagedInstitutionDTO } from "./get-managed-institution-dto";

export class GetManagedInstitutionController extends Controller {
  private readonly usecase: GetManagedInstitutionUseCase;

  public constructor(usecase: GetManagedInstitutionUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingManager = GetManagedInstitutionDTO.In.create(incoming);

    const institutionFound = await this.usecase.execute(incomingManager);

    if (!institutionFound) {
      return this.onUnauthorized();
    }

    const outcoming = GetManagedInstitutionDTO.Out.toRaw(institutionFound);

    return this.onOk(outcoming);
  }
}
