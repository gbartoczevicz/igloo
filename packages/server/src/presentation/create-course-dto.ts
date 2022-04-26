import { Course, InstitutionManager } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace CreateCourseDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(income: unknown): In {
      const { name, manager } = income as any || {};

      const result = validator({
        name: {
          option: Options.requiredString,
          value: name,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(name, manager);
    }
  }

  export class Out {
    public static toRaw(course: Course) {
      return {
        id: course.id.value,
        name: course.name,
        institutionId: course.institutionId.value,
      };
    }
  }
}
