import { CreateUserIn } from "~/dtos";

declare global {
  namespace Express {
    interface Request {
      createUser: CreateUserIn;
    }
  }
}
