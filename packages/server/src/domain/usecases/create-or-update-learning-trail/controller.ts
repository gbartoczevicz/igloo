import { Controller, HttpResult } from "~/contracts/presentation";
import { IdFactory, LearningTrailFactory } from "~/domain/factories";
import { CreateOrUpdateLearningTrailUseCase } from "./usecase";

export class CreateOrUpdateLearningTrailController extends Controller {
  public constructor(
    private readonly learningTrailFactory: LearningTrailFactory,
    private readonly usecase: CreateOrUpdateLearningTrailUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const learningTrail = this.learningTrailFactory.toEntity(incoming);
    const { institutionId } = incoming as any;

    await this.usecase.execute(learningTrail, institutionId);

    return this.onCreated(
      this.learningTrailFactory.toPresentation(learningTrail),
    );
  }
}
