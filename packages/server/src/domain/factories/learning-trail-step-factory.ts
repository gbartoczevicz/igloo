import { Options, validator } from "~/lib/validators";
import { LearningTrailStep } from "../entities";
import { IdFactory } from "./id-factory";

export class LearningTrailStepFactory {
  public constructor(
    private readonly idFactory: IdFactory,
  ) {}

  public toEntity(params: any = {}): LearningTrailStep {
    const result = validator({
      id: {
        value: params.id,
        option: Options.optionalString,
      },
      position: {
        value: params.position,
        option: Options.requiredNumber,
      },
      learningTrailId: {
        value: params.learningTrailId,
        option: Options.requiredString,
      },
      dueDate: {
        value: params.dueDate,
        option: Options.requiredDate,
      },
      availableAt: {
        value: params.availableAt,
        option: Options.requiredDate,
      },
      createdAt: {
        value: params.createdAt,
        option: Options.optionalDate,
      },
    });

    if (result.isRight()) {
      throw result.value;
    }

    const id = this.idFactory.create(params.id);
    const position = Number(params.position);
    const learningTrailId = this.idFactory.create(params.learningTrailId);
    const dueDate = new Date(params.dueDate);
    const availableAt = new Date(params.availableAt);
    const createdAt = params.createdAt
      ? new Date(params.createdAt)
      : new Date();

    return new LearningTrailStep(
      id,
      position,
      learningTrailId,
      dueDate,
      availableAt,
      createdAt,
      new Date(),
    );
  }

  public toPresentation(step: LearningTrailStep) {
    return {
      ...step,
      id: step.id.value,
      learningTrailId: step.learningTrailId.value,
    };
  }
}
