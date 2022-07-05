import { Controller, HttpResult } from "~/contracts/presentation";
import { LearningTrailStepFactory } from "~/domain/factories";
import { CreateOrUpdateLearningTrailStepUseCase } from "./usecase";

export class CreateOrUpdateLearningTrailStepController extends Controller {
  public constructor(
    private readonly stepFactory: LearningTrailStepFactory,
    private readonly usecase: CreateOrUpdateLearningTrailStepUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const step = this.stepFactory.toEntity(incoming);
    const { institutionId } = incoming as any;

    await this.usecase.execute(step, institutionId);

    return this.onCreated(
      this.stepFactory.toPresentation(step),
    );
  }
}
