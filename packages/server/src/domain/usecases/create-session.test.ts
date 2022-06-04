import { systemTestSetup } from "~/setup/system-test";
import { SessionToken, User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import * as Errors from "~/domain/errors";
import { CreateSessionUseCase } from "./create-session";

function makeSut() {
  const {
    factories: { emailFactory, sessionTokenFactory: tokenFactory },
    hash: { passwordHandler },
    repositories: { usersRepo },
  } = systemTestSetup();

  const id = new Id("any");
  const email = new Email("any");

  return {
    sut: new CreateSessionUseCase(
      emailFactory,
      usersRepo,
      passwordHandler,
      tokenFactory,
    ),
    emailFactory,
    usersRepo,
    passwordHandler,
    tokenFactory,
    user: new User(
      id,
      "any",
      null,
      email,
      new Password("any"),
      new Phone("any"),
    ),
    email,
    sessionToken: new SessionToken("any", id),
  };
}

describe("Create Session Use Case Tests", () => {
  it("should create a new session", async () => {
    const {
      sut,
      user,
      emailFactory,
      passwordHandler,
      tokenFactory,
      usersRepo,
      email,
      sessionToken,
    } = makeSut();

    jest.spyOn(emailFactory, "create").mockImplementationOnce(() => email);

    jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    jest.spyOn(passwordHandler, "compare").mockImplementationOnce(() => true);

    jest.spyOn(tokenFactory, "create").mockImplementationOnce(() =>
      sessionToken
    );

    const result = await sut.create({ email: "any", password: "any" });

    expect(result).toEqual(sessionToken);
  });

  it("should validate if the user exists", () => {
    const {
      sut,
      emailFactory,
      email,
    } = makeSut();

    jest.spyOn(emailFactory, "create").mockImplementationOnce(() => email);

    const result = sut.create({ email: "any", password: "any" });

    expect(result).rejects.toBeInstanceOf(Errors.UserNotFound);
  });

  it("should validate if the password match", () => {
    const {
      sut,
      user,
      emailFactory,
      passwordHandler,
      usersRepo,
      email,
    } = makeSut();

    jest.spyOn(emailFactory, "create").mockImplementationOnce(() => email);

    jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    jest.spyOn(passwordHandler, "compare").mockImplementationOnce(() => false);

    const result = sut.create({ email: "any", password: "any" });

    expect(result).rejects.toBeInstanceOf(Errors.PasswordNotMatch);
  });
});
