import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";
import { CommonErrorOut } from "./common-error-out";

export class CreateInstitutionIn extends InDTO {
  public readonly name: string;

  public readonly uniqueId: unknown;

  public readonly phone: string;

  private constructor(name: string, uniqueId: unknown, phone: string) {
    super();

    this.name = name;
    this.uniqueId = uniqueId;
    this.phone = phone;
  }

  public static create(
    income: unknown,
  ): InDTOResult<CreateInstitutionIn, CommonErrorOut> {
    const { name, uniqueId, phone } = income as any || {};

    const errors = this.validate({
      name: {
        validationType: DTOValidationMapping.requiredString,
        value: name,
      },
      uniqueId: {
        validationType: DTOValidationMapping.requiredString,
        value: uniqueId,
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
      } as Result<CommonErrorOut>;
    }

    return new CreateInstitutionIn(name, uniqueId, phone);
  }
}
