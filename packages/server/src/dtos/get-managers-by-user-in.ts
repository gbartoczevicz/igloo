import { InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { User } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class GetManagersByUserIn extends InDTO {
  public readonly user: User;

  private constructor(user: User) {
    super();

    this.user = user;
  }

  public static create(
    income: unknown,
  ): InDTOResult<GetManagersByUserIn, CommonErrorOut> {
    const { user } = income as any || {};

    if (!(user instanceof User)) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("User is invalid"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new GetManagersByUserIn(user);
  }
}
