import { HttpMiddleware, HttpRoute } from "~/adapters/http";

import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateInstitutionAndManagerController } from "~/domain/controllers";
import {
  CreateInstitutionManagerUseCase,
  CreateInstitutionUseCase,
} from "~/domain/usecases";
import { CreateInstitutionAndManagerIn, CreateInstitutionIn } from "~/dtos";

export function setupCreateInstitutions(
  systemSetup: SystemSetup,
  userAuthenticated: HttpMiddleware,
) {
  const createInstitutionUseCase = new CreateInstitutionUseCase(
    systemSetup.factories.institutionFactory,
    systemSetup.repositories.institutionsRepo,
  );
  const createManagerUseCase = new CreateInstitutionManagerUseCase(
    systemSetup.repositories.institutionManagersRepo,
    systemSetup.repositories.institutionsRepo,
  );

  const controller = new CreateInstitutionAndManagerController(
    createInstitutionUseCase,
    createManagerUseCase,
  );

  return new HttpRoute(
    "/institutions",
    Method.post,
    (req, res, _next) => {
      controller.execute(req.createInstitutionAndManager).then((result) =>
        res.status(result.status).json(result.content.toRaw())
      );
    },
    [userAuthenticated, (req, res, next) => {
      const result = CreateInstitutionIn.create(req.body);

      if (result instanceof CreateInstitutionIn) {
        const createInstitutionAndManagerIn = new CreateInstitutionAndManagerIn(
          result,
          req.user,
        );

        req.createInstitutionAndManager = createInstitutionAndManagerIn;

        return next();
      }

      return res.status(result.status).json(result.content.toRaw());
    }],
  );
}
