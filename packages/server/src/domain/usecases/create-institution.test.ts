import { systemTestSetup } from "~/setup/system-test";
import { Institution } from "../entities";
import * as Errors from "~/domain/errors";
import { Cnpj, Id, Phone } from "../entities/values";
import { CreateInstitutionUseCase } from "./create-institution";

function makeSut() {
  const {
    factories: { institutionFactory },
    repositories: { institutionsRepo },
  } = systemTestSetup();

  return {
    sut: new CreateInstitutionUseCase(institutionFactory, institutionsRepo),
    institutionFactory,
    institutionsRepo,
    anInstitution: new Institution(
      new Id("any"),
      "any",
      new Cnpj("any"),
      new Phone("any"),
    ),
  };
}

describe("Create Institution Use Case Tests", () => {
  it("should create an institution", async () => {
    const { anInstitution, institutionFactory, sut } = makeSut();

    jest.spyOn(institutionFactory, "create").mockImplementationOnce(() =>
      anInstitution
    );

    const result = await sut.execute({
      ...anInstitution,
      cnpj: anInstitution.cnpj.toString(),
      phone: anInstitution.phone.toString(),
    });

    expect(result).toEqual(anInstitution);
  });

  it("should validate if the phone is already in use", () => {
    const { anInstitution, institutionFactory, institutionsRepo, sut } =
      makeSut();

    jest.spyOn(institutionFactory, "create").mockImplementationOnce(() =>
      anInstitution
    );

    jest.spyOn(institutionsRepo, "findByPhone").mockImplementationOnce(() =>
      Promise.resolve(anInstitution)
    );

    const promise = sut.execute({
      ...anInstitution,
      cnpj: anInstitution.cnpj.toString(),
      phone: anInstitution.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Errors.PhoneAlreadyInUse);
  });

  it("should validate if the cnpj is already in use", () => {
    const { anInstitution, institutionFactory, institutionsRepo, sut } =
      makeSut();

    jest.spyOn(institutionFactory, "create").mockImplementationOnce(() =>
      anInstitution
    );

    jest.spyOn(institutionsRepo, "findByCnpj").mockImplementationOnce(() =>
      Promise.resolve(anInstitution)
    );

    const promise = sut.execute({
      ...anInstitution,
      cnpj: anInstitution.cnpj.toString(),
      phone: anInstitution.phone.toString(),
    });

    expect(promise).rejects.toBeInstanceOf(Errors.CnpjAlreadyInUse);
  });
});
