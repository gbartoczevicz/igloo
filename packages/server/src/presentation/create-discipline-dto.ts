import { Discipline } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace CreateDisciplineDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly courseId: string,
    ) {}

    public static create(incoming: unknown): In {
      const { name, courseId } = incoming as any || {};

      const result = validator({
        name: {
          option: Options.requiredString,
          value: name,
        },
        courseId: {
          option: Options.requiredString,
          value: courseId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(name, courseId);
    }
  }

  export class Out {
    public static toRaw(discipline: Discipline) {
      return {
        id: discipline.id.value,
        name: discipline.name,
        courseId: discipline.courseId.value,
      };
    }
  }
}
