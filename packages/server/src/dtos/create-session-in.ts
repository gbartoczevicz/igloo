import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { CommonErrorOut } from "./common-error-out";

export class CreateSessionIn extends InDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }

  public static create(
    income: unknown,
  ): InDTOResult<CreateSessionIn, CommonErrorOut> {
    const { email, password } = income as any || {};

    const errors = this.validate({
      email: {
        validationType: DTOValidationMapping.requiredString,
        value: email,
      },
      password: {
        validationType: DTOValidationMapping.requiredString,
        value: password,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(errors),
        status: HttpStatus.unprocessableEntity,
      } as HttpResult<CommonErrorOut>;
    }

    return new CreateSessionIn(email, password);
  }
}
