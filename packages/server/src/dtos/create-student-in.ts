import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { InstitutionManager } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class CreateStudentIn extends InDTO {
  public readonly studentUserId: string;

  public readonly manager: InstitutionManager;

  private constructor(studentUserId: string, manager: InstitutionManager) {
    super();

    this.manager = manager;
    this.studentUserId = studentUserId;
  }

  public static create(
    income: unknown,
  ): InDTOResult<CreateStudentIn, CommonErrorOut> {
    const { studentUserId, manager } = income as any || {};

    const errors = this.validate({
      studentUserId: {
        validationType: DTOValidationMapping.requiredString,
        value: studentUserId,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(errors),
        status: HttpStatus.unprocessableEntity,
      } as HttpResult<CommonErrorOut>;
    }

    if (!(manager instanceof InstitutionManager)) {
      return {
        content: new CommonErrorOut(
          new AuthenticationError("Manager is invalid"),
        ),
        status: HttpStatus.unauthorized,
      };
    }

    return new CreateStudentIn(studentUserId, manager);
  }
}
