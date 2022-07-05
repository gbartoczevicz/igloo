import { HttpMiddleware } from "~/adapters/http";
import { HttpStatus } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { GetUserInstitutionRolesUseCase } from "~/domain/usecases";
import { UserRelatedToInstitutionController } from "~/presentation";

export function userRelatedToInstitution(
  systemSetup: SystemSetup,
): HttpMiddleware {
  const usecase = new GetUserInstitutionRolesUseCase(
    systemSetup.factories.idFactory,
    systemSetup.repositories.institutionManagersRepo,
    systemSetup.repositories.professorsRepo,
    systemSetup.repositories.studentsRepo,
  );
  const controller = new UserRelatedToInstitutionController(
    usecase,
    systemSetup.factories.idFactory,
  );

  return (req, res, next) => {
    const params = {
      institutionId: req.params.institutionId,
      user: req.currentUser,
    };

    controller.execute(params).then((outcoming) => {
      if (outcoming.status !== HttpStatus.ok) {
        return res.status(outcoming.status).json(outcoming.content);
      }

      req.institutionId = outcoming.content as any;

      return next();
    });
  };
}
