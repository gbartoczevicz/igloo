import { Institution, User } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace GetManagedInstitutionsDTO {
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
    public static toRaw(outcoming: Institution[]) {
      return outcoming.map((o) => ({
        id: o.id.value,
        name: o.name,
        cnpj: o.cnpj.toString(),
        phone: o.phone.toString(),
      }));
    }
  }
}
