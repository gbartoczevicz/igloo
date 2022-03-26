import { User } from "~/domain/entities";
import { CreateSessionIn, CreateUserIn } from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      user: User;
      createUser: CreateUserIn;
      createSession: CreateSessionIn;
    }
  }
}
