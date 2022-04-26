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
    const incomingManager = GetInstitutionCoursesDTO.In.create(incoming);

    const sessionCreated = await this.usecase.execute(incomingManager.manager);

    const outcoming = GetInstitutionCoursesDTO.Out.toRaw(sessionCreated);

    return this.onCreated(outcoming);
  }
}
