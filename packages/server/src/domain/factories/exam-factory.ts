import { Options, validator } from "~/lib/validators";
import { Exam } from "../entities";
import { IdFactory } from "./id-factory";

export class ExamFactory {
  public constructor(
    private readonly idFactory: IdFactory,
  ) {}

  public toEntity(params: any = {}): Exam {
    const result = validator({
      id: {
        value: params.id,
        option: Options.optionalString,
      },
      learningTrailStepId: {
        value: params.learningTrailStepId,
        option: Options.requiredString,
      },
    });

    if (result.isRight()) {
      throw result.value;
    }

    const id = this.idFactory.create(params.id);
    const learningTrailStepId = this.idFactory.create(
      params.learningTrailStepId,
    );

    return new Exam(id, learningTrailStepId);
  }

  public toPresentation(exam: Exam) {
    return {
      id: exam.id.value,
      learningTrailStepId: exam.learningTrailStepId.value,
    };
  }
}
