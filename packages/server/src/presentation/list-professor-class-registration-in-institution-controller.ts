import { Controller, HttpResult } from "~/contracts/presentation";
import { ListProfessorClassRegistrationInInstitutionUseCase } from "~/domain/usecases";
import { ListProfessorClassRegistrationInInstitutionDTO } from "./list-professor-class-registration-in-institution-dto";

export class ListProfessorClassRegistrationInInstitutionController
  extends Controller {
  private readonly usecase: ListProfessorClassRegistrationInInstitutionUseCase;

  public constructor(
    usecase: ListProfessorClassRegistrationInInstitutionUseCase,
  ) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(
    incoming?: unknown,
  ): Promise<HttpResult<unknown>> {
    const data = ListProfessorClassRegistrationInInstitutionDTO.In.create(
      incoming,
    );

    const result = await this.usecase.execute(data);

    return this.onOk(
      ListProfessorClassRegistrationInInstitutionDTO.Out.toRaw(result),
    );
  }
}
