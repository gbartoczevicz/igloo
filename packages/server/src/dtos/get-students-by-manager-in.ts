import { InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { InstitutionManager } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class GetStudentsByManagerIn extends InDTO {
  public readonly manager: InstitutionManager;

  private constructor(manager: InstitutionManager) {
    super();

    this.manager = manager;
  }

  public static create(
    income: unknown,
  ): InDTOResult<GetStudentsByManagerIn, CommonErrorOut> {
    const { manager } = income as any || {};

    if (!(manager instanceof InstitutionManager)) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("Manager is invalid"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new GetStudentsByManagerIn(manager);
  }
}
