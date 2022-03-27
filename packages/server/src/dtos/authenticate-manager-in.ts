import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { User } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class AuthenticateManagerIn extends InDTO {
  public readonly user: User;

  public readonly institutionId: string;

  private constructor(user: User, institutionId: string) {
    super();

    this.user = user;
    this.institutionId = institutionId;
  }

  public static create(
    incoming: unknown,
  ): InDTOResult<AuthenticateManagerIn, CommonErrorOut> {
    const { user, institutionId } = incoming as any || {};

    const errors = this.validate({
      institutionId: {
        validationType: DTOValidationMapping.requiredString,
        value: institutionId,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("Institution is required"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    if (!(user instanceof User)) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("User is invalid"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new AuthenticateManagerIn(user, institutionId);
  }
}
