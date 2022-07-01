import { InstitutionManager, User } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

declare global {
  namespace Express {
    interface Request {
      institutionId: Id;
      currentManager: InstitutionManager;
      currentUser: User;
    }
  }
}
