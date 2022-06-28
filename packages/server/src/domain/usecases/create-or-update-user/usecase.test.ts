import { User } from "~/domain/entities";
import { Email, Id, Password, Phone } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";

import { CreateOrUpdateUserUseCase } from "./usecase";
import Errors from "./errors";

function createSut() {
  const {
    repositories: {
      usersRepo,
    },
  } = systemTestSetup();

  const user = new User(
    new Id("any"),
    "any",
    null,
    new Email("any"),
    new Password("any"),
    new Phone("any"),
  );

  const anotherUser = new User(
    new Id("another"),
    "any",
    null,
    new Email("any"),
    new Password("any"),
    new Phone("any"),
  );

  return {
    sut: new CreateOrUpdateUserUseCase(usersRepo),
    usersRepo,
    fixure: {
      user,
      anotherUser,
    },
  };
}

describe("Create or Update User Use Case tests suit", () => {
  it("should save the user when not finding any user with the same e-mail neither phone", async () => {
    const { sut, usersRepo, fixure } = createSut();

    const findByEmail = jest.spyOn(usersRepo, "findByEmail");
    const findByPhone = jest.spyOn(usersRepo, "findByPhone");
    const save = jest.spyOn(usersRepo, "save");

    await sut.execute(fixure.user);

    expect(findByEmail).toBeCalledWith(fixure.user.email);
    expect(findByPhone).toBeCalledWith(fixure.user.phone);
    expect(save).toBeCalledWith(fixure.user);
  });

  it("should save the user when finding the same user with the same e-mail either phone", async () => {
    const { sut, usersRepo, fixure } = createSut();

    const findByEmail = jest.spyOn(usersRepo, "findByEmail")
      .mockImplementationOnce(() => Promise.resolve(fixure.user));

    const findByPhone = jest.spyOn(usersRepo, "findByPhone")
      .mockImplementationOnce(() => Promise.resolve(fixure.user));

    const save = jest.spyOn(usersRepo, "save");

    await sut.execute(fixure.user);

    expect(findByEmail).toBeCalledWith(fixure.user.email);
    expect(findByPhone).toBeCalledWith(fixure.user.phone);
    expect(save).toBeCalledWith(fixure.user);
  });

  it("should throw an exception when finding another user with the same e-mail", () => {
    const { sut, usersRepo, fixure } = createSut();

    jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
      Promise.resolve(fixure.anotherUser)
    );

    expect(
      sut.execute(fixure.user),
    ).rejects.toBeInstanceOf(Errors.EmailAlreadyInUse);
  });

  it("should throw an exception when finding another user with the same phone", () => {
    const { sut, usersRepo, fixure } = createSut();

    jest.spyOn(usersRepo, "findByPhone").mockImplementationOnce(() =>
      Promise.resolve(fixure.anotherUser)
    );

    expect(
      sut.execute(fixure.user),
    ).rejects.toBeInstanceOf(Errors.PhoneAlreadyInUse);
  });
});
