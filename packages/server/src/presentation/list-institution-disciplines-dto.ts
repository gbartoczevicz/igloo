import { Discipline, InstitutionManager } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace ListInstitutionDisciplinesDTO {
  export class In {
    private constructor(
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { manager } = incoming as any || {};

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(manager);
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
