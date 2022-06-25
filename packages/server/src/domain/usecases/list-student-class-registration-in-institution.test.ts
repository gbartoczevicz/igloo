import { systemTestSetup } from "~/setup/system-test";
import { ListStudentClassRegistrationInInstitutionUseCase } from "./list-student-class-registration-in-institution";

function makeSut() {
  const {
    repositories: { studentClassRegistrationsRepo },
    factories: { idFactory },
  } = systemTestSetup();

  return {
    sut: new ListStudentClassRegistrationInInstitutionUseCase(
      idFactory,
      studentClassRegistrationsRepo,
    ),
  };
}

describe("List the institution's student class course registrations test suit", () => {
  it("should list the expected student class course registrations", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ institutionId: "any" });

    expect(result).toEqual([]);
  });
});
