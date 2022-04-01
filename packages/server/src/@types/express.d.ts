import { InstitutionManager, User } from "~/domain/entities";
import {
  CreateInstitutionAndManagerIn,
  CreateProfessorIn,
  CreateSessionIn,
  CreateStudentIn,
  CreateUserIn,
  GetProfessorsByManagerIn,
} from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      user: User;
      manager: InstitutionManager;
      createInstitutionAndManager: CreateInstitutionAndManagerIn;
      createUser: CreateUserIn;
      createSession: CreateSessionIn;
      createProfessor: CreateProfessorIn;
      createStudent: CreateStudentIn;
      getProfessorsByManager: GetProfessorsByManagerIn;
    }
  }
}
