import { User, UserRoles } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace UserRelatedToInstitutionDTO {
  export class In {
    private constructor(
      public readonly userId: string,
      public readonly institutionId: string,
    ) {}

    public static create(incoming: unknown): In {
      const { user, institutionId } = incoming as any || {};

      if (!(user instanceof User)) {
        throw new UnauthorizedError("User is invalid");
      }

      const result = validator({
        institutionId: {
          option: Options.requiredString,
          value: institutionId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(user.id.value, institutionId);
    }
  }

  export class Out {
    public static toRaw(_userRoles: UserRoles) {
      return {};
    }
  }
}
