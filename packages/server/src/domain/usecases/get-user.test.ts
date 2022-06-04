import { systemTestSetup } from "~/setup/system-test";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { GetUserUseCase } from "./get-user";

function makeSut() {
  const {
    repositories: { usersRepo },
  } = systemTestSetup();

  return {
    sut: new GetUserUseCase(usersRepo),
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

describe("Get User Use Case Tests", () => {
  it("should get the exepcted user", async () => {
    const { sut, user, usersRepo } = makeSut();

    jest.spyOn(usersRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    const result = await sut.execute({ id: user.id });

    expect(result).toEqual(user);
  });
});
