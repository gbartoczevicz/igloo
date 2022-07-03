import { Controller, HttpResult } from "~/contracts/presentation";
import { LearningTrailFactory } from "~/domain/factories";
import { ListInstitutionLearningTrailsUseCase } from "./usecase";

export class ListInstitutionLearningTrailsController extends Controller {
  public constructor(
    private readonly usecase: ListInstitutionLearningTrailsUseCase,
    private readonly factory: LearningTrailFactory,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const learningTrails = await this.usecase.execute(
      (incoming as any).institutionId,
    );

    return this.onOk(learningTrails.map(this.factory.toPresentation));
  }
}
