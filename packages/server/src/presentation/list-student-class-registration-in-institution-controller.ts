import { Controller, HttpResult } from "~/contracts/presentation";
import { ListStudentClassRegistrationInInstitutionUseCase } from "~/domain/usecases";
import { ListStudentClassRegistrationInInstitutionDTO } from "./list-student-class-registration-in-institution-dto";

export class ListStudentClassRegistrationInInstitutionController
  extends Controller {
  private readonly usecase: ListStudentClassRegistrationInInstitutionUseCase;

  public constructor(
    usecase: ListStudentClassRegistrationInInstitutionUseCase,
  ) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(
    incoming?: unknown,
  ): Promise<HttpResult<unknown>> {
    const data = ListStudentClassRegistrationInInstitutionDTO.In.create(
      incoming,
    );

    const result = await this.usecase.execute(data);

    return this.onOk(
      ListStudentClassRegistrationInInstitutionDTO.Out.toRaw(result),
    );
  }
}
