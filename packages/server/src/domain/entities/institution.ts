import { Cnpj, Id, Phone } from "./values";

export class Institution {
  public readonly id: Id;

  public readonly name: string;

  public readonly cnpj: Cnpj;

  public readonly phone: Phone;

  public constructor(id: Id, name: string, cnpj: Cnpj, phone: Phone) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
    this.phone = phone;
  }
}
