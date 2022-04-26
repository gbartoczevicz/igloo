import { InstitutionManager, StudentUserComposition } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace GetStudentsByManagerDTO {
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
    public static toRaw(outcoming: StudentUserComposition[]) {
      return outcoming.map((o) => ({
        id: o.student.id.value,
        user: {
          id: o.user.id.value,
          name: o.user.name,
          surname: o.user.surname,
          email: o.user.email.toString(),
          phone: o.user.phone.toString(),
        },
      }));
    }
  }
}
