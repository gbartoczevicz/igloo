import { cnpj } from "cpf-cnpj-validator";
import { CnpjValidator } from "~/contracts/validators";

export class CnpjValidatorImpl implements CnpjValidator {
  public isValid(incoming: string): boolean {
    return cnpj.isValid(incoming);
  }
}
