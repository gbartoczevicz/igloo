import { Controller, HttpResult } from "~/contracts/presentation";
import { ListInstitutionClassCoursesUseCase } from "~/domain/usecases";
import { ListInstitutionClassCoursesDTO } from "./list-institution-class-courses-dto";

export class ListInstitutionClassCoursesController extends Controller {
  private readonly usecase: ListInstitutionClassCoursesUseCase;

  public constructor(usecase: ListInstitutionClassCoursesUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const classCoursesFound = await this.usecase.execute(
      ListInstitutionClassCoursesDTO.In.create(incoming),
    );

    return this.onOk(
      ListInstitutionClassCoursesDTO.Out.toRaw(classCoursesFound),
    );
  }
}
