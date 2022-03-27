import { OutDTO } from "~/contracts/dtos";
import { Institution, InstitutionManager } from "~/domain/entities";

type EntityTouple = [InstitutionManager, Institution];

export class CreateInstitutionAndManagerOut extends OutDTO<EntityTouple> {
  public constructor(outcoming: EntityTouple) {
    super(outcoming);
  }

  public toRaw(): unknown {
    const manager = this.outcoming[0];
    const institution = this.outcoming[1];

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
