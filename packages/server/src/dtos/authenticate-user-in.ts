import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class AuthenticateUserIn extends InDTO {
  public readonly token: string;

  private constructor(token: string) {
    super();

    this.token = token;
  }

  public static create(
    incoming: unknown,
  ): InDTOResult<AuthenticateUserIn, CommonErrorOut> {
    const errors = this.validate({
      token: {
        validationType: DTOValidationMapping.requiredString,
        value: incoming,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("Token is required"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new AuthenticateUserIn(incoming as string);
  }
}
