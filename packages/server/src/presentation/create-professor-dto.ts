import { InstitutionManager, Professor } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace CreateProfessorDTO {
  export class In {
    private constructor(
      public readonly professorUserId: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { professorUserId, manager } = incoming as any || {};

      const result = validator({
        professorUserId: {
          option: Options.requiredString,
          value: professorUserId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(professorUserId, manager);
    }
  }

  export class Out {
    public static toRaw(professor: Professor): unknown {
      return {
        id: professor.id.value,
        professorUserId: professor.userId.value,
        institutionId: professor.institutionId.value,
      };
    }
  }
}
