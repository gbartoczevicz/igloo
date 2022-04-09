import { OutDTO } from "~/contracts/dtos";
import { InstitutionManager } from "~/domain/entities";

export class GetManagersByUserOut extends OutDTO<InstitutionManager[]> {
  public constructor(outcoming: InstitutionManager[]) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming.map((o) => ({
      id: o.id.value,
      userId: o.userId.value,
      institutionId: o.institutionId.value,
    }));
  }
}
