import {
  EmailValidator,
  Method,
  PasswordHandler,
  PhoneValidator,
} from "~/contracts";

import { UsersRepo } from "~/contracts/repositories";

import { CreateUserController } from "~/domain/controllers";
import { IdFactory } from "~/domain/factories/id-factory";
import { UserFactory } from "~/domain/factories/user-factory";
import { CreateUserUseCase } from "~/domain/usecases";

const idFactory: IdFactory = {} as IdFactory;
const emailValidator: EmailValidator = {} as EmailValidator;
const passwordHandler: PasswordHandler = {} as PasswordHandler;
const phoneValidator: PhoneValidator = {} as PhoneValidator;

const userFactory = new UserFactory(
  idFactory,
  emailValidator,
  passwordHandler,
  phoneValidator,
);

const usersRepo: UsersRepo = {} as UsersRepo;

const createUserUseCase = new CreateUserUseCase(userFactory, usersRepo);

const createUserController = new CreateUserController(createUserUseCase);

export function setupCreateUsers() {
  return {
    controller: createUserController,
    route: "/users",
    method: Method.post,
  };
}
