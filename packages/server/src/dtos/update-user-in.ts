import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { CommonErrorOut } from "./common-error-out";
import { InvalidField } from "~/errors";

export class UpdateUserIn extends InDTO {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly surname: string | null,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
  ) {
    super();
  }

  public static create(
    income: unknown,
  ): InDTOResult<UpdateUserIn, CommonErrorOut> {
    const { id, name, surname, email, phone, password } = income as any || {};

    const errors = this.validate({
      id: {
        validationType: DTOValidationMapping.requiredString,
        value: id,
      },
      name: {
        validationType: DTOValidationMapping.requiredString,
        value: name,
      },
      surname: {
        validationType: DTOValidationMapping.optionalString,
        value: surname,
      },
      email: {
        validationType: DTOValidationMapping.requiredString,
        value: email,
      },
      phone: {
        validationType: DTOValidationMapping.requiredString,
        value: phone,
      },
      password: {
        validationType: DTOValidationMapping.requiredString,
        value: password,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(errors),
        status: HttpStatus.badRequest,
      };
    }

    return new UpdateUserIn(
      id,
      name,
      surname || null,
      email,
      phone,
      password,
    );
  }
}
