import {
  InstitutionManager,
  ProfessorClassRegistration,
} from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace RegisterProfessorIntoClassDTO {
  export class In {
    private constructor(
      public readonly professorId: string,
      public readonly classCourseId: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { professorId, classCourseId, manager } = incoming as any || {};

      const result = validator({
        professorId: {
          option: Options.requiredString,
          value: professorId,
        },
        classCourseId: {
          option: Options.requiredString,
          value: classCourseId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(professorId, classCourseId, manager);
    }
  }

  export class Out {
    public static toRaw(registration: ProfessorClassRegistration) {
      return {
        id: registration.id.value,
        professorId: registration.professorId.value,
        classCourseId: registration.classCourseId.value,
      };
    }
  }
}
