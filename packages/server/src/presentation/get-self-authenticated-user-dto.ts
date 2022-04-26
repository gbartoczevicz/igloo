import { User } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace GetSelfAuthenticatedUserDTO {
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
    public static toRaw(outcoming: User): unknown {
      return {
        id: outcoming.id.value,
        name: outcoming.name,
        surname: outcoming.surname,
        email: outcoming.email.toString(),
        phone: outcoming.phone.toString(),
      };
    }
  }
}
