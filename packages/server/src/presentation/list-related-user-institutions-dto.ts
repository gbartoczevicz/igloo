import { Institution, User, UserRelatedInstitutions } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace ListRelatedUserInstitutionsDTO {
  export class In {
    private constructor(
      public readonly user: User,
    ) {}

    public static create(incoming: unknown): In {
      const { user } = incoming as any || {};

      if (!(user instanceof User)) {
        throw new UnauthorizedError("User is invalid");
      }

      return new In(user);
    }
  }

  export class Out {
    public static toRaw(userRelatedInstitutions: UserRelatedInstitutions) {
      return {
        students: userRelatedInstitutions.students.map((s) =>
          this.institutionRaw(s)
        ),
        professors: userRelatedInstitutions.professors.map((p) =>
          this.institutionRaw(p)
        ),
        managers: userRelatedInstitutions.managers.map((m) =>
          this.institutionRaw(m)
        ),
      };
    }

    private static institutionRaw(institution: Institution) {
      return {
        id: institution.id.value,
        name: institution.name,
      };
    }
  }
}
