import { HttpMiddleware, HttpRoute } from "~/adapters/http";

import { Method } from "~/contracts/http";
import { SystemSetup } from "~/contracts/setup/system";
import { CreateInstitutionAndManagerController } from "~/presentation";
import {
  CreateInstitutionManagerUseCase,
  CreateInstitutionUseCase,
} from "~/domain/usecases";

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
    systemSetup.factories.managerFactory,
  );

  const controller = new CreateInstitutionAndManagerController(
    createInstitutionUseCase,
    createManagerUseCase,
  );

  return new HttpRoute(
    "/institutions",
    Method.post,
    (req, res, _next) => {
      const incoming = {
        ...(req.body || {}),
        user: req.currentUser,
      };

      controller.execute(incoming).then((result) =>
        res.status(result.status).json(result.content)
      );
    },
    [userAuthenticated],
  );
}
