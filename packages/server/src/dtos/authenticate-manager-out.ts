import { OutDTO } from "~/contracts/dtos";
import { InstitutionManager } from "~/domain/entities";

export class AuthenticateManagerOut extends OutDTO<InstitutionManager> {
  public constructor(outcoming: InstitutionManager) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming;
  }
}
