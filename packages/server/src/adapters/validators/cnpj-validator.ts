import { validate } from "cnpj";
import { CnpjValidator } from "~/contracts/validators";

export class CnpjValidatorImpl implements CnpjValidator {
  public isValid(incoming: string): boolean {
    return validate(incoming);
  }
}
