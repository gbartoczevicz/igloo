import { systemTestSetup } from "~/setup/system-test";
import { InstitutionManager, Professor, Student, UserRoles } from "../entities";
import { Id } from "../entities/values";
import { GetUserInstitutionRolesUseCase } from "./get-user-institution-roles";

function makeSut() {
  const {
    factories: { idFactory },
    repositories: {
      institutionManagersRepo: managersRepo,
      professorsRepo,
      studentsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new GetUserInstitutionRolesUseCase(
      idFactory,
      managersRepo,
      professorsRepo,
      studentsRepo,
    ),
    idFactory,
    managersRepo,
    professorsRepo,
    studentsRepo,
    fixtures: {
      manager: new InstitutionManager(id, id, id),
      professor: new Professor(id, id, id),
      student: new Student(id, id, id),
    },
  };
}

describe("Get User Institution Roles Use Case tests suit", () => {
  it("should find the expected user's roles", async () => {
    const {
      sut,
      managersRepo,
      professorsRepo,
      studentsRepo,
      fixtures,
    } = makeSut();

    jest.spyOn(managersRepo, "findByInstitutionAndUser").mockImplementationOnce(
      () => Promise.resolve(fixtures.manager),
    );
    jest.spyOn(professorsRepo, "findByInstitutionAndUser")
      .mockImplementationOnce(() => Promise.resolve(fixtures.professor));
    jest.spyOn(studentsRepo, "findByInstitutionAndUser").mockImplementationOnce(
      () => Promise.resolve(fixtures.student),
    );

    const result = await sut.execute({ institutionId: "any", userId: "any" });

    expect(result).toEqual(
      new UserRoles(fixtures.manager, fixtures.professor, fixtures.student),
    );
  });
});
