import { Id, Phone } from "./values";

export class Institution {
  public readonly id: Id;

  public readonly name: string;

  public readonly uniqueId: unknown;

  public readonly phone: Phone;

  public constructor(id: Id, name: string, uniqueId: unknown, phone: Phone) {
    this.id = id;
    this.name = name;
    this.uniqueId = uniqueId;
    this.phone = phone;
  }
}
