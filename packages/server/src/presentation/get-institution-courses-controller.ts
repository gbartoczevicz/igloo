import { Controller, HttpResult } from "~/contracts/presentation";
import { GetInstitutionCoursesUseCase } from "~/domain/usecases";
import { GetInstitutionCoursesDTO } from "./get-institution-courses-dto";

export class GetInsittutionCoursesController extends Controller {
  private readonly usecase: GetInstitutionCoursesUseCase;

  public constructor(usecase: GetInstitutionCoursesUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingInstitution = GetInstitutionCoursesDTO.In.create(incoming);

    const coursesFound = await this.usecase.execute(incomingInstitution);

    const outcoming = GetInstitutionCoursesDTO.Out.toRaw(coursesFound);

    return this.onCreated(outcoming);
  }
}
