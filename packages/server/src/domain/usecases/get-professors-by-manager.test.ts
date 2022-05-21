import { systemTestSetup } from "~/setup/system-test";
import {
  InstitutionManager,
  Professor,
  ProfessorUserComposition,
  User,
} from "../entities";
import { Email, Id, Password, Phone } from "../entities/values";
import { GetProfessorsByManagerUseCase } from "./get-professors-by-manager";
import * as Errors from "~/domain/errors";

function makeSut() {
  const {
    repositories: { professorsRepo, usersRepo },
  } = systemTestSetup();

  const id = new Id("any");

  const user = new User(
    id,
    "any",
    null,
    new Email("any"),
    new Password("any"),
    new Phone("any"),
  );
  const professor = new Professor(id, user.id, id);
  const professorOfAnotherUser = new Professor(id, new Id("any_other"), id);

  return {
    sut: new GetProfessorsByManagerUseCase(professorsRepo, usersRepo),
    professorsRepo,
    usersRepo,
    manager: new InstitutionManager(id, id, id),
    user,
    professor,
    professorOfAnotherUser,
    composition: new ProfessorUserComposition(professor, user),
  };
}

describe("Get Professors by Manager Use Case test", () => {
  it("should get the expected professor list", async () => {
    const {
      sut,
      manager,
      professor,
      professorsRepo,
      user,
      usersRepo,
      composition,
    } = makeSut();

    jest.spyOn(professorsRepo, "findAllByInstitution").mockImplementationOnce(
      () => Promise.resolve([professor]),
    );

    jest.spyOn(usersRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([user])
    );

    const result = await sut.execute({ manager });

    expect(result).toContainEqual(composition);
  });

  it("should throw an error when the user from professor is not found", () => {
    const {
      sut,
      manager,
      professorOfAnotherUser,
      professorsRepo,
      user,
      usersRepo,
    } = makeSut();

    jest.spyOn(professorsRepo, "findAllByInstitution").mockImplementationOnce(
      () => Promise.resolve([professorOfAnotherUser]),
    );

    jest.spyOn(usersRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([user])
    );

    const result = sut.execute({ manager });

    expect(result).rejects.toBeInstanceOf(Errors.UserNotFoundWithProfessor);
  });
});
