import * as Errors from "~/domain/errors";
import { systemTestSetup } from "~/setup/system-test";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { UpdateUserUseCase } from "./update-user";

function makeSut() {
  const { factories: { userFactory }, repositories: { usersRepo } } =
    systemTestSetup();

  const anUser = new User(
    new Id("any"),
    "any",
    null,
    new Email("any"),
    new Password("any"),
    new Phone("any"),
  );

  return {
    sut: new UpdateUserUseCase(
      userFactory,
      usersRepo,
    ),
    userFactory,
    usersRepo,
    anUser,
    anotherUser: new User(
      new Id("another_id"),
      anUser.name,
      anUser.surname,
      anUser.email,
      anUser.password,
      anUser.phone,
    ),
  };
}

describe("Create User Use Case Tests", () => {
  describe("should update the user when", () => {
    it("the e-mail is already in use by themself", async () => {
      const { sut, userFactory, usersRepo, anUser: expectedUser } = makeSut();

      jest.spyOn(userFactory, "create").mockImplementationOnce(() =>
        expectedUser
      );

      jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
        Promise.resolve(expectedUser)
      );

      const result = await sut.execute({
        ...expectedUser,
        id: expectedUser.id.value,
        email: expectedUser.email.toString(),
        password: expectedUser.password.toString(),
        phone: expectedUser.phone.toString(),
      });

      expect(result).toEqual(expectedUser);
    });

    it("the phone is already in use by themself", async () => {
      const { sut, userFactory, usersRepo, anUser: expectedUser } = makeSut();

      jest.spyOn(userFactory, "create").mockImplementationOnce(() =>
        expectedUser
      );

      jest.spyOn(usersRepo, "findByPhone").mockImplementationOnce(() =>
        Promise.resolve(expectedUser)
      );

      const result = await sut.execute({
        ...expectedUser,
        id: expectedUser.id.value,
        email: expectedUser.email.toString(),
        password: expectedUser.password.toString(),
        phone: expectedUser.phone.toString(),
      });

      expect(result).toEqual(expectedUser);
    });

    it("the e-mail and the phone is not in use by themself, neither anyone", async () => {
      const { sut, userFactory, usersRepo, anUser: expectedUser } = makeSut();

      jest.spyOn(userFactory, "create").mockImplementationOnce(() =>
        expectedUser
      );

      const result = await sut.execute({
        ...expectedUser,
        id: expectedUser.id.value,
        email: expectedUser.email.toString(),
        password: expectedUser.password.toString(),
        phone: expectedUser.phone.toString(),
      });

      expect(result).toEqual(expectedUser);
    });
  });

  it("should validate if the e-mail is already in use", () => {
    const { sut, userFactory, usersRepo, anUser, anotherUser } = makeSut();

    jest.spyOn(userFactory, "create").mockImplementationOnce(() => anUser);

    jest.spyOn(usersRepo, "findByEmail").mockImplementationOnce(() =>
      Promise.resolve(anotherUser)
    );

    const promise = sut.execute({
      ...anUser,
      id: anUser.id.value,
      email: anUser.email.toString(),
      password: anUser.password.toString(),
      phone: anUser.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Errors.EmailAlreadyInUse);
  });

  it("should validate if the phone is already in use", () => {
    const { sut, userFactory, usersRepo, anUser, anotherUser } = makeSut();

    jest.spyOn(userFactory, "create").mockImplementationOnce(() => anUser);

    jest.spyOn(usersRepo, "findByPhone").mockImplementationOnce(() =>
      Promise.resolve(anotherUser)
    );

    const promise = sut.execute({
      ...anUser,
      id: anUser.id.value,
      email: anUser.email.toString(),
      password: anUser.password.toString(),
      phone: anUser.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Errors.PhoneAlreadyInUse);
  });
});
