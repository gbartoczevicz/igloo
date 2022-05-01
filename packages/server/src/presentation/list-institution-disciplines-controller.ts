import { Controller, HttpResult } from "~/contracts/presentation";
import { ListInstitutionDisciplinesUseCase } from "~/domain/usecases";
import { ListInstitutionDisciplinesDTO } from "./list-institution-disciplines-dto";

export class ListInstitutionDisciplinesController extends Controller {
  private readonly usecase: ListInstitutionDisciplinesUseCase;

  public constructor(usecase: ListInstitutionDisciplinesUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const incomingInstitution = ListInstitutionDisciplinesDTO.In.create(
      incoming,
    );

    const disciplinesFound = await this.usecase.execute(incomingInstitution);

    const outcoming = ListInstitutionDisciplinesDTO.Out.toRaw(disciplinesFound);

    return this.onOk(outcoming);
  }
}
