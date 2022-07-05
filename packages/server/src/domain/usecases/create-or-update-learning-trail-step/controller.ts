import { Controller, HttpResult } from "~/contracts/presentation";
import { LearningTrailStepFactory } from "~/domain/factories";
import { CreateOrUpdateLearningTrailStepUseCase } from "./usecase";

export class CreateOrUpdateLearningTrailStepController extends Controller {
  public constructor(
    private readonly learningTrailFactory: LearningTrailStepFactory,
    private readonly usecase: CreateOrUpdateLearningTrailStepUseCase,
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
