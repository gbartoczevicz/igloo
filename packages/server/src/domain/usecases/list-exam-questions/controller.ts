import { Controller, HttpResult } from "~/contracts/presentation";
import { ExamQuestionFactory, IdFactory } from "~/domain/factories";
import { ListExamQuestionsUseCase } from "./usecase";

export class ListExamQuestionsController extends Controller {
  public constructor(
    private readonly usecase: ListExamQuestionsUseCase,
    private readonly idFactory: IdFactory,
    private readonly examQuestionFactory: ExamQuestionFactory,
  ) {
    super();
  }

  protected override async handle(
    incoming?: unknown,
  ): Promise<HttpResult<unknown>> {
    const { institutionId, examId } = incoming as any;

    const examQuestions = await this.usecase.execute(
      this.idFactory.create(examId),
      institutionId,
    );

    return this.onOk(
      examQuestions.map(this.examQuestionFactory.toPresentation),
    );
  }
}
