import { Factory } from "~/contracts/domain";
import { CnpjValidator } from "~/contracts/validators";
import { DomainError } from "~/errors";
import { Cnpj } from "../entities/values";

export class CnpjFactory implements Factory<string, Cnpj> {
  private readonly cnpjValidator: CnpjValidator;

  public constructor(cnpjValidator: CnpjValidator) {
    this.cnpjValidator = cnpjValidator;
  }

  public create(incoming: string): Cnpj {
    if (!this.cnpjValidator.isValid(incoming)) {
      throw new DomainError("The CNPJ is invalid");
    }

    return new Cnpj(incoming);
  }
}
