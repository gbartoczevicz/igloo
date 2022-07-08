import { Controller, HttpResult } from "~/contracts/presentation";
import { ExamFactory } from "~/domain/factories";
import { CreateOrUpdateExamUseCase } from "./usecase";

export class CreateOrUpdateExamController extends Controller {
  public constructor(
    private readonly factory: ExamFactory,
    private readonly usecase: CreateOrUpdateExamUseCase,
  ) {
    super();
  }

  protected override async handle(
    incoming?: unknown,
  ): Promise<HttpResult<unknown>> {
    const exam = this.factory.toEntity(incoming);
    const { institutionId } = incoming as any;

    await this.usecase.execute(exam, institutionId);

    return this.onCreated(
      this.factory.toPresentation(exam),
    );
  }
}
