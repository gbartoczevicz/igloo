import { systemTestSetup } from "~/setup/system-test";
import { ListProfessorClassRegistrationInInstitutionUseCase } from "./list-professor-class-registration-in-institution";

function makeSut() {
  const {
    repositories: { professorClassRegistrationsRepo },
    factories: { idFactory },
  } = systemTestSetup();

  return {
    sut: new ListProfessorClassRegistrationInInstitutionUseCase(
      idFactory,
      professorClassRegistrationsRepo,
    ),
  };
}

describe("List the institution's professor class course registrations test suit", () => {
  it("should list the expected professor class course registrations", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ institutionId: "any" });

    expect(result).toEqual([]);
  });
});
