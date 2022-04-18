import { DTOValidationMapping, InDTO, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { HttpResult } from "~/contracts/presentation";
import { InstitutionManager } from "~/domain/entities";
import { AuthenticationError } from "~/errors";
import { CommonErrorOut } from "./common-error-out";

export class CreateProfessorIn extends InDTO {
  public readonly professorUserId: string;

  public readonly manager: InstitutionManager;

  private constructor(professorUserId: string, manager: InstitutionManager) {
    super();

    this.manager = manager;
    this.professorUserId = professorUserId;
  }

  public static create(
    income: unknown,
  ): InDTOResult<CreateProfessorIn, CommonErrorOut> {
    const { professorUserId, manager } = income as any || {};

    const errors = this.validate({
      professorUserId: {
        validationType: DTOValidationMapping.requiredString,
        value: professorUserId,
      },
    });

    if (errors.length > 0) {
      return {
        content: new CommonErrorOut(errors),
        status: HttpStatus.badRequest,
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

    return new CreateProfessorIn(professorUserId, manager);
  }
}
