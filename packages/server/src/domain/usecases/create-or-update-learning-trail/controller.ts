import { Controller, HttpResult } from "~/contracts/presentation";
import { LearningTrailFactory } from "~/domain/factories";
import { CreateOrUpdateLearningTrailUseCase } from "./usecase";

export class CreateOrUpdateLearningTrailController extends Controller {
  public constructor(
    private readonly factory: LearningTrailFactory,
    private readonly usecase: CreateOrUpdateLearningTrailUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const learningTrail = this.factory.toEntity(incoming);

    await this.usecase.execute(learningTrail);

    return this.onCreated(this.factory.toPresentation(learningTrail));
  }
}
