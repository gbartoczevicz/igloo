import { Controller, HttpResult } from "~/contracts/presentation";
import { IdFactory, LearningTrailStepFactory } from "~/domain/factories";
import { ListLearningTrailStepsUseCase } from "./usecase";

export class ListLearningTrailStepsController extends Controller {
  public constructor(
    private readonly idFactory: IdFactory,
    private readonly stepFactory: LearningTrailStepFactory,
    private readonly usecase: ListLearningTrailStepsUseCase,
  ) {
    super();
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const { institutionId, learningTrailId } = incoming as any;

    const steps = await this.usecase.execute(
      this.idFactory.create(learningTrailId),
      institutionId,
    );

    return this.onOk(
      steps.map(this.stepFactory.toPresentation),
    );
  }
}
