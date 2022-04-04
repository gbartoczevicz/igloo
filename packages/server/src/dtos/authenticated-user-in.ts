import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { User } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class AuthenticatedUserIn extends InDTO {
  public readonly user: User;

  private constructor(user: User) {
    super();

    this.user = user;
  }

  public static create(
    incoming: unknown,
  ): InDTOResult<AuthenticatedUserIn, CommonErrorOut> {
    if (!(incoming instanceof User)) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("User is invalid"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new AuthenticatedUserIn(incoming);
  }
}
