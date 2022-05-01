import { Discipline } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace ListInstitutionDisciplinesDTO {
  export class In {
    private constructor(
      public readonly institutionId: string,
    ) {}

    public static create(incoming: unknown): In {
      const { institutionId } = incoming as any || {};

      const result = validator({
        institutionId: {
          option: Options.requiredString,
          value: institutionId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(institutionId);
    }
  }

  export class Out {
    public static toRaw(disciplines: Discipline[]) {
      return disciplines.map((discipline) => ({
        id: discipline.id.value,
        courseId: discipline.courseId.value,
        name: discipline.name,
      }));
    }
  }
}
