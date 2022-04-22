import { InstitutionManager, User } from "~/domain/entities";
import * as D from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      currentManager: InstitutionManager;
      currentUser: User;
    }
  }
}
