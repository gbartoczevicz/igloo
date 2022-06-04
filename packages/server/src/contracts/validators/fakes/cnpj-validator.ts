import { CnpjValidator } from "../cnpj-validator";

export class FakeCnpjValidator implements CnpjValidator {
  public isValid(_incoming: string): boolean {
    return true;
  }
}
