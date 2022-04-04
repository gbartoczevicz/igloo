import { InstitutionManager, User } from "~/domain/entities";
import * as D from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      user: User;
      manager: InstitutionManager;
      createInstitutionAndManager: D.CreateInstitutionAndManagerIn;
      createUser: D.CreateUserIn;
      createSession: D.CreateSessionIn;
      createProfessor: D.CreateProfessorIn;
      createStudent: D.CreateStudentIn;
      getProfessorsByManager: D.GetProfessorsByManagerIn;
      getStudentsByManager: D.GetStudentsByManagerIn;
    }
  }
}
