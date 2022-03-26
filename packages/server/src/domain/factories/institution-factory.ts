import { Factory } from "~/contracts/domain";
import { CreateInstitutionIn } from "~/dtos";
import { Institution } from "../entities";
import { CnpjFactory } from "./cnpj-factory";
import { IdFactory } from "./id-factory";
import { PhoneFactory } from "./phone-factory";

export class InstitutionFactory
  implements Factory<CreateInstitutionIn, Institution> {
  private readonly idFactory: IdFactory;

  private readonly phoneFactory: PhoneFactory;

  private readonly cnpjFactory: CnpjFactory;

  public constructor(
    idFactory: IdFactory,
    phoneFactory: PhoneFactory,
    cnpjFactory: CnpjFactory,
  ) {
    this.idFactory = idFactory;
    this.phoneFactory = phoneFactory;
    this.cnpjFactory = cnpjFactory;
  }

  create(incoming: CreateInstitutionIn): Institution {
    const id = this.idFactory.create();
    const phone = this.phoneFactory.create(incoming.phone);
    const cnpj = this.cnpjFactory.create(incoming.cnpj);

    return new Institution(id, incoming.name, cnpj, phone);
  }
}
