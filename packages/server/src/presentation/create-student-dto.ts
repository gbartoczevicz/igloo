import { InstitutionManager, Student } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace CreateStudentDTO {
  export class In {
    private constructor(
      public readonly studentUserId: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { studentUserId, manager } = incoming as any || {};

      const result = validator({
        studentUserId: {
          option: Options.requiredString,
          value: studentUserId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(manager instanceof InstitutionManager)) {
        throw new UnauthorizedError("Manager is invalid");
      }

      return new In(studentUserId, manager);
    }
  }

  export class Out {
    public static toRaw(professor: Student): unknown {
      return {
        id: professor.id.value,
        studentUserId: professor.userId.value,
        institutionId: professor.institutionId.value,
      };
    }
  }
}
