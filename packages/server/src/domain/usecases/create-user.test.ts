import { systemTestSetup } from "~/setup/system-test";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { CreateUserUseCase } from "./create-user";

function makeSut() {
  const systemSetup = systemTestSetup();

  const userFactory = systemSetup.factories.userFactory;
  const usersRepo = systemSetup.repositories.usersRepo;

  return {
    sut: new CreateUserUseCase(
      userFactory,
      usersRepo,
    ),
    userFactory,
    usersRepo,
  };
}

describe("Create User Use Case Tests", () => {
  it("should create the expected user", async () => {
    const { sut, userFactory } = makeSut();

    const expectedUser = new User(
      new Id("any"),
      "any",
      null,
      new Email("any"),
      new Password("any"),
      new Phone("any"),
    );

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
});
