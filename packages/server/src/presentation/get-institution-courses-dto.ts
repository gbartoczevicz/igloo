import { Course, InstitutionManager } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace GetInstitutionCoursesDTO {
  export class In {
    private constructor(
      public readonly manager: InstitutionManager,
    ) {}

    public static create(income: unknown): In {
      const { manager } = income as any || {};

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(manager);
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
