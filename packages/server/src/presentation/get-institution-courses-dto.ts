import { Course } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace GetInstitutionCoursesDTO {
  export class In {
    private constructor(
      public readonly institutionId: string,
    ) {}

    public static create(income: unknown): In {
      const { institutionId } = income as any || {};

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
    public static toRaw(courses: Course[]) {
      return courses.map((course) => ({
        id: course.id.value,
        name: course.name,
        institutionId: course.institutionId.value,
      }));
    }
  }
}
