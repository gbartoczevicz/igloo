import { systemTestSetup } from "~/setup/system-test";
import { AuthenticateUserUseCase } from "./authenticate-user";
import * as Errors from "~/domain/errors";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";

function makeSut() {
  const {
    hash: { tokenProvider },
    factories: { idFactory },
    repositories: { usersRepo },
  } = systemTestSetup();

  return {
    sut: new AuthenticateUserUseCase(tokenProvider, idFactory, usersRepo),
    tokenProvider,
    idFactory,
    usersRepo,
    user: new User(
      new Id("any"),
      "any",
      null,
      new Email("any"),
      new Password("any"),
      new Phone("any"),
    ),
  };
}

describe("Authenticate User Use Case Tests", () => {
  it("should auhenticate the user", async () => {
    const { sut, user, usersRepo } = makeSut();

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const result = await sut.execute({
      token: " any",
    });

    expect(result).toEqual(user);
  });

  it("should check if the code is falsy", () => {
    const { sut } = makeSut();

    const result = sut.execute({
      token: null as any,
    });

    expect(result).rejects.toBeInstanceOf(Errors.AuthUser.InvalidToken);
  });

  it("should validate the token itself when decoding", () => {
    const { sut, tokenProvider } = makeSut();

    jest.spyOn(tokenProvider, "decode").mockImplementationOnce(() => {
      throw new Error();
    });

    const result = sut.execute({
      token: " any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.AuthUser.ErrorWhenDecoding);
  });

  it("should check if the user exists", () => {
    const { sut } = makeSut();

    const result = sut.execute({
      token: " any",
    });

    expect(result).rejects.toBeInstanceOf(Errors.AuthUser.UserNotFound);
  });
});
