import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { CommonErrorOut } from "./common-error-out";

export class CreateInstitutionIn extends InDTO {
  public readonly name: string;

  public readonly cnpj: string;

  public readonly phone: string;

  private constructor(name: string, cnpj: string, phone: string) {
    super();

    this.name = name;
    this.cnpj = cnpj;
    this.phone = phone;
  }

  public static create(
    income: unknown,
  ): InDTOResult<CreateInstitutionIn, CommonErrorOut> {
    const { name, cnpj, phone } = income as any || {};

    const errors = this.validate({
      name: {
        validationType: DTOValidationMapping.requiredString,
        value: name,
      },
      cnpj: {
        validationType: DTOValidationMapping.requiredString,
        value: cnpj,
      },
      phone: {
        validationType: DTOValidationMapping.requiredString,
        value: phone,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(errors),
        status: HttpStatus.badRequest,
      } as HttpResult<CommonErrorOut>;
    }

    return new CreateInstitutionIn(name, cnpj, phone);
  }
}
