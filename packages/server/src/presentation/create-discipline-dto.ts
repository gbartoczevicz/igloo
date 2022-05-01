import { Discipline, InstitutionManager } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace CreateDisciplineDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly courseId: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { name, courseId, manager } = incoming as any || {};

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

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      if (result.isRight()) {
        throw result.value;
      }

      return new In(name, courseId, manager);
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
