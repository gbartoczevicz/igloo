import { systemTestSetup } from "~/setup/system-test";
import { ListInstitutionClassCoursesUseCase } from "./list-institution-class-courses";

function makeSut() {
  const {
    repositories: { classCoursesRepo },
    factories: { idFactory },
  } = systemTestSetup();

  return {
    sut: new ListInstitutionClassCoursesUseCase(classCoursesRepo, idFactory),
  };
}

describe("List the institution's class courses", () => {
  it("should list the expected class courses", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ institutionId: "any" });

    expect(result).toEqual([]);
  });
});
