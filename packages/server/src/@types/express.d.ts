import { InstitutionManager, User } from "~/domain/entities";
import * as D from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      manager: InstitutionManager;
      authenticatedUserIn: D.AuthenticatedUserIn;
      createInstitutionAndManager: D.CreateInstitutionAndManagerIn;
      createUser: D.CreateUserIn;
      updateUser: D.UpdateUserIn;
      createSession: D.CreateSessionIn;
      createProfessor: D.CreateProfessorIn;
      createStudent: D.CreateStudentIn;
      getProfessorsByManager: D.GetProfessorsByManagerIn;
      getStudentsByManager: D.GetStudentsByManagerIn;
    }
  }
}
