import { InstitutionManager, User } from "~/domain/entities";

declare global {
  namespace Express {
    interface Request {
      currentManager: InstitutionManager;
      currentUser: User;
    }
  }
}
