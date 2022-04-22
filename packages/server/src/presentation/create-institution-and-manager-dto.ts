import { Institution, InstitutionManager, User } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";
import { Options, validator } from "~/lib/validators";

export namespace CreateInstitutionAndManagerDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly cnpj: string,
      public readonly phone: string,
      public readonly user: User,
    ) {}

    public static create(incoming: unknown): In {
      const { name, cnpj, phone, user } = incoming as any || {};

      const result = validator({
        name: {
          option: Options.requiredString,
          value: name,
        },
        cnpj: {
          option: Options.requiredString,
          value: cnpj,
        },
        phone: {
          option: Options.requiredString,
          value: phone,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      if (!(user instanceof User)) {
        throw new UnauthorizedError("User is invalid");
      }

      return new In(name, cnpj, phone, user);
    }
  }

  export class Out {
    public static toRaw(manager: InstitutionManager, institution: Institution) {
      return {
        id: institution.id.value,
        name: institution.name,
        cnpj: institution.cnpj.toString(),
        phone: institution.phone.toString(),
        manager: {
          id: manager.id.value,
          userId: manager.userId.value,
        },
      };
    }
  }
}
