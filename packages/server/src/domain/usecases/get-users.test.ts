import { systemTestSetup } from "~/setup/system-test";
import { User } from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { GetUsersUseCase } from "./get-users";

function makeSut() {
  const {
    repositories: { usersRepo },
  } = systemTestSetup();

  return {
    sut: new GetUsersUseCase(usersRepo),
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

describe("Get Users Use Case Tests", () => {
  it("should get the exepcted user list", async () => {
    const { sut, user, usersRepo } = makeSut();

    jest.spyOn(usersRepo, "findAll").mockImplementationOnce(() =>
      Promise.resolve([user])
    );

    const result = await sut.execute();

    expect(result).toContainEqual(user);
  });
});
