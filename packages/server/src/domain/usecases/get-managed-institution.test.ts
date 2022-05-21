import { systemTestSetup } from "~/setup/system-test";
import { Institution, InstitutionManager } from "../entities";
import { Cnpj, Id, Phone } from "../entities/values";
import { GetManagedInstitutionUseCase } from "./get-managed-institution";

function makeSut() {
  const {
    repositories: { institutionsRepo },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new GetManagedInstitutionUseCase(institutionsRepo),
    institutionsRepo,
    manager: new InstitutionManager(id, id, id),
    institution: new Institution(id, "any", new Cnpj("any"), new Phone("any")),
  };
}

describe("Get Managed Institution Use Case test", () => {
  it("should get the expected institution", async () => {
    const { sut, institution, institutionsRepo, manager } = makeSut();

    jest.spyOn(institutionsRepo, "findById").mockImplementationOnce(() =>
      Promise.resolve(institution)
    );

    const result = await sut.execute({ manager });

    expect(result).toEqual(institution);
  });
});
