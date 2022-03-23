import { Factory } from "~/contracts/domain";
import { CreateInstitutionIn } from "~/dtos";
import { Institution } from "../entities";
import { IdFactory } from "./id-factory";
import { PhoneFactory } from "./phone-factory";

export class InstitutionFactory
  implements Factory<CreateInstitutionIn, Institution> {
  private readonly idFactory: IdFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(idFactory: IdFactory, phoneFactory: PhoneFactory) {
    this.idFactory = idFactory;
    this.phoneFactory = phoneFactory;
  }

  create(incoming: CreateInstitutionIn): Institution {
    const { name, uniqueId } = incoming;

    const id = this.idFactory.create();
    const phone = this.phoneFactory.create(incoming.phone);

    return new Institution(id, name, uniqueId, phone);
  }
}
