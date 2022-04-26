import { Institution } from "../entities";
import { CnpjFactory } from "./cnpj-factory";
import { IdFactory } from "./id-factory";
import { PhoneFactory } from "./phone-factory";

type Params = {
  id?: string;
  name: string;
  phone: string;
  cnpj: string;
};

export class InstitutionFactory {
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

  create(incoming: Params): Institution {
    const id = this.idFactory.create(incoming.id);
    const phone = this.phoneFactory.create(incoming.phone);
    const cnpj = this.cnpjFactory.create(incoming.cnpj);

    return new Institution(id, incoming.name, cnpj, phone);
  }
}
