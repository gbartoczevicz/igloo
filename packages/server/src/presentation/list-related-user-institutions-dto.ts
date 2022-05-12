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
      return userRelatedInstitutions.institutions.map((i) => ({
        id: i.institution.id.value,
        name: i.institution.name,
        userRole: i.userRole,
      }));
    }
  }
}
