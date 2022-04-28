import { Institution, InstitutionManager } from "~/domain/entities";
import { UnauthorizedError } from "~/errors";

export namespace GetManagedInstitutionDTO {
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
    public static toRaw(outcoming: Institution) {
      return {
        id: outcoming.id.value,
        name: outcoming.name,
        cnpj: outcoming.cnpj.toString(),
        phone: outcoming.phone.toString(),
      };
    }
  }
}
