import { User } from "~/domain/entities";
import {
  CreateInstitutionAndManagerIn,
  CreateSessionIn,
  CreateUserIn,
} from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      user: User;
      createInstitutionAndManager: CreateInstitutionAndManagerIn;
      createUser: CreateUserIn;
      createSession: CreateSessionIn;
    }
  }
}
