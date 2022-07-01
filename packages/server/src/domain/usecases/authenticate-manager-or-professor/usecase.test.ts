import { InstitutionManager, Professor, User } from "~/domain/entities";
import { Email, Id, Password, Phone } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { AuthenticateManagerOrProfessorUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      institutionManagersRepo,
      professorsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new AuthenticateManagerOrProfessorUseCase(
      professorsRepo,
      institutionManagersRepo,
    ),
    professorsRepo,
    institutionManagersRepo,
    fixtures: {
      user: new User(
        id,
        "any",
        null,
        new Email("any"),
        new Password("any"),
        new Phone("any"),
      ),
      professor: new Professor(id, id, id),
      manager: new InstitutionManager(id, id, id),
      id,
    },
  };
}

describe("Authenticate Manager or Professor Use Case", () => {
  it("should authenticate a professor", async () => {
    const { sut, professorsRepo, fixtures } = createSut();

    jest.spyOn(
      professorsRepo,
      "findByInstitutionAndUser",
    ).mockImplementationOnce(() => Promise.resolve(fixtures.professor));

    const result = await sut.execute({
      user: fixtures.user,
      institutionId: fixtures.id,
    });

    expect(result).toBeInstanceOf(Professor);
    expect(result).toEqual(fixtures.professor);
  });

  it("should authenticate a manager", async () => {
    const { sut, institutionManagersRepo, fixtures } = createSut();

    jest.spyOn(
      institutionManagersRepo,
      "findByInstitutionAndUser",
    ).mockImplementationOnce(() => Promise.resolve(fixtures.manager));

    const result = await sut.execute({
      user: fixtures.user,
      institutionId: fixtures.id,
    });

    expect(result).toBeInstanceOf(InstitutionManager);
    expect(result).toEqual(fixtures.manager);
  });

  it("should throw exception when not finding neither professor or manager", () => {
    const { sut, fixtures } = createSut();

    const rejection = sut.execute({
      user: fixtures.user,
      institutionId: fixtures.id,
    });

    expect(rejection).rejects.toBeInstanceOf(Errors.NeitherProfessorOrManager);
  });
});
