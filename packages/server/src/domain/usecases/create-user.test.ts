import * as Erros from "~/domain/errors";
import { systemTestSetup } from "~/setup/system-test";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { CreateUserUseCase } from "./create-user";

function makeSut() {
  const { factories: { userFactory }, repositories: { usersRepo } } =
    systemTestSetup();

  return {
    sut: new CreateUserUseCase(
      userFactory,
      usersRepo,
    ),
    userFactory,
    usersRepo,
    anUser: new User(
      new Id("any"),
      "any",
      null,
      new Email("any"),
      new Password("any"),
      new Phone("any"),
    ),
  };
}

describe("Create User Use Case Tests", () => {
  it("should create the expected user", async () => {
    const { sut, userFactory, anUser: expectedUser } = makeSut();

    jest.spyOn(userFactory, "create").mockImplementationOnce(() =>
      expectedUser
    );

    const result = await sut.create({
      ...expectedUser,
      email: expectedUser.email.toString(),
      password: expectedUser.password.toString(),
      phone: expectedUser.phone.toString(),
    });

    expect(result).toEqual(expectedUser);
  });

  it("should validate if the e-mail is already in use", () => {
    const { sut, userFactory, usersRepo, anUser } = makeSut();

    jest.spyOn(userFactory, "create").mockImplementationOnce(() => anUser);

    jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const promise = sut.create({
      ...anUser,
      email: anUser.email.toString(),
      password: anUser.password.toString(),
      phone: anUser.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Erros.EmailAlreadyInUse);
  });

  it("should validate if the phone is already in use", () => {
    const { sut, userFactory, usersRepo, anUser } = makeSut();

    jest.spyOn(userFactory, "create").mockImplementationOnce(() => anUser);

    jest.spyOn(usersRepo, "findByPhone").mockImplementationOnce(() =>
      Promise.resolve(anUser)
    );

    const promise = sut.create({
      ...anUser,
      email: anUser.email.toString(),
      password: anUser.password.toString(),
      phone: anUser.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Erros.PhoneAlreadyInUse);
  });
});
