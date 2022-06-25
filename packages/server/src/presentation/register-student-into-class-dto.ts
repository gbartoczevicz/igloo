import {
  InstitutionManager,
  StudentClassRegistration,
} from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace RegisterStudentIntoClassDTO {
  export class In {
    private constructor(
      public readonly studentId: string,
      public readonly classCourseId: string,
      public readonly manager: InstitutionManager,
    ) {}

    public static create(incoming: unknown): In {
      const { studentId, classCourseId, manager } = incoming as any || {};

      const result = validator({
        studentId: {
          option: Options.requiredString,
          value: studentId,
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

      return new In(studentId, classCourseId, manager);
    }
  }

  export class Out {
    public static toRaw(studentClassRegistration: StudentClassRegistration) {
      return {
        id: studentClassRegistration.id.value,
        studentId: studentClassRegistration.studentId.value,
        classCourseId: studentClassRegistration.classCourseId.value,
      };
    }
  }
}
