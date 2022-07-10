import { Controller, HttpResult } from "~/contracts/presentation";
import { ExamFactory } from "~/domain/factories";
import { ListInstitutionExamsUseCase } from "./usecase";

export class ListInstitutionExamsController extends Controller {
  public constructor(
    private readonly usecase: ListInstitutionExamsUseCase,
    private readonly factory: ExamFactory,
  ) {
    super();
  }

  protected override async handle(
    incoming?: unknown,
  ): Promise<HttpResult<unknown>> {
    const { institutionId } = incoming as any;

    const exams = await this.usecase.execute(institutionId);

    return this.onOk(exams.map(this.factory.toPresentation));
  }
}
