import { Factory } from "~/contracts/domain";
import { Institution } from "../entities";
import { IdFactory } from "./id-factory";
import { PhoneFactory } from "./phone-factory";

export class InstitutionFactory implements Factory<unknown, Institution> {
  private readonly idFactory: IdFactory;

  private readonly phoneFactory: PhoneFactory;

  public constructor(idFactory: IdFactory, phoneFactory: PhoneFactory) {
    this.idFactory = idFactory;
    this.phoneFactory = phoneFactory;
  }

  create(incoming: unknown): Institution {
    const { name, uniqueId, phone } = incoming as any || {};

    const id = this.idFactory.create();

    return new Institution(id, name, uniqueId, this.phoneFactory.create(phone));
  }
}
