import { InstitutionManager, User } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace AuthenticateManagerDTO {
  export class In {
    private constructor(
      public readonly user: User,
      public readonly institutionId: string,
    ) {}

    public static create(
      incoming: unknown,
    ): In {
      const { user, institutionId } = incoming as any || {};

      const result = validator({
        institutionId: {
          option: Options.requiredString,
          value: institutionId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(user instanceof User)) {
        throw new UnauthorizedError("User is invalid");
      }

      return new In(user, institutionId);
    }
  }

  export class Out {
    public static toRaw(outcoming: InstitutionManager): unknown {
      return outcoming;
    }
  }
}
