import { Options, validator } from "~/lib/validators";

import { IdFactory } from "./id-factory";
import { LearningTrail } from "../entities";

export class LearningTrailFactory {
  public constructor(
    private readonly idFactory: IdFactory,
  ) {}

  public toEntity(params: any = {}): LearningTrail {
    const { name, ...delegate } = params;

    const result = validator({
      id: {
        value: delegate.id,
        option: Options.optionalString,
      },
      name: {
        value: name,
        option: Options.requiredString,
      },
      disciplineId: {
        value: delegate.disciplineId,
        option: Options.requiredString,
      },
    });

    if (result.isRight()) {
      throw result.value;
    }

    const id = this.idFactory.create(delegate.id);
    const disciplineId = this.idFactory.create(delegate.disciplineId);

    return new LearningTrail(id, name, disciplineId);
  }

  public toPresentation(learningTrail: LearningTrail) {
    return {
      id: learningTrail.id.value,
      name: learningTrail.name,
      disciplineId: learningTrail.disciplineId.value,
    };
  }
}
