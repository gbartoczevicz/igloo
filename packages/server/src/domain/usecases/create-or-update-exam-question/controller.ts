import { Controller, HttpResult } from "~/contracts/presentation";
import { ExamQuestionFactory } from "~/domain/factories";
import { CreateOrUpdateExamQuestionUseCase } from "./usecase";

export class CreateOrUpdateExamQuestionController extends Controller {
  public constructor(
    private readonly factory: ExamQuestionFactory,
    private readonly usecase: CreateOrUpdateExamQuestionUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const question = this.factory.toEntity(incoming);
    const { institutionId } = incoming as any;

    await this.usecase.execute(question, institutionId);

    return this.onCreated(
      this.factory.toPresentation(question),
    );
  }
}
