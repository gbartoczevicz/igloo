import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";
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
  ): InDTOResult<UpdateUserIn, InvalidField[]> {
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
        content: errors,
        status: HttpStatus.badRequest,
      } as Result<InvalidField[]>;
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
