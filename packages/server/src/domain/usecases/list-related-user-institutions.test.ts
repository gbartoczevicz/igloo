import { systemTestSetup } from "~/setup/system-test";
import {
  Institution,
  InstitutionManager,
  Professor,
  Student,
  User,
  UserRelatedInstitutions,
} from "../entities";
import { Cnpj, Email, Id, Password, Phone, UserRole } from "../entities/values";
import * as Errors from "~/domain/errors";
import { ListRelatedUserInstitutionsUseCase } from "./list-related-user-institutions";

function makeSut() {
  const {
    repositories: {
      institutionManagersRepo: managersRepo,
      studentsRepo,
      professorsRepo,
      institutionsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");
  const cnpj = new Cnpj("any");
  const phone = new Phone("any");

  const user = new User(
    id,
    "any",
    null,
    new Email("any"),
    new Password("any"),
    phone,
  );

  const studentInstitutionId = new Id("student_institution_id");
  const managerInstitutionId = new Id("manager_institution_id");
  const professorInstitutionId = new Id("professor_institution_id");

  const manager = new InstitutionManager(id, id, managerInstitutionId);
  const student = new Student(id, id, studentInstitutionId);
  const professor = new Professor(id, id, professorInstitutionId);

  const anyInstitution = new Institution(id, "any", cnpj, phone);
  const studentInstitution = new Institution(
    studentInstitutionId,
    "any",
    cnpj,
    phone,
  );
  const managerInstitution = new Institution(
    managerInstitutionId,
    "any",
    cnpj,
    phone,
  );
  const professorInstitution = new Institution(
    professorInstitutionId,
    "any",
    cnpj,
    phone,
  );

  const userRelatedInstitutions = new UserRelatedInstitutions([
    {
      institution: studentInstitution,
      userRole: UserRole.student,
    },
    {
      institution: managerInstitution,
      userRole: UserRole.manager,
    },
    {
      institution: professorInstitution,
      userRole: UserRole.professor,
    },
  ]);

  return {
    sut: new ListRelatedUserInstitutionsUseCase(
      managersRepo,
      studentsRepo,
      professorsRepo,
      institutionsRepo,
    ),
    managersRepo,
    studentsRepo,
    professorsRepo,
    institutionsRepo,
    userRelatedInstitutions,
    user,
    manager,
    professor,
    student,
    studentInstitution,
    managerInstitution,
    professorInstitution,
    anyInstitution,
  };
}

describe("List related user institutions Use Case Tests", () => {
  it("should get the expected institutions", async () => {
    const {
      studentInstitution,
      managerInstitution,
      professorInstitution,
      institutionsRepo,
      manager,
      managersRepo,
      professor,
      professorsRepo,
      student,
      studentsRepo,
      sut,
      user,
      userRelatedInstitutions,
    } = makeSut();

    jest.spyOn(institutionsRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([
        studentInstitution,
        managerInstitution,
        professorInstitution,
      ])
    );
    jest.spyOn(managersRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([manager])
    );
    jest.spyOn(studentsRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([student])
    );
    jest.spyOn(professorsRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([professor])
    );

    const result = await sut.execute({ user });

    expect(result).toEqual(userRelatedInstitutions);
  });

  it("should throw en error when the user somehow is not related to any institution", () => {
    const {
      anyInstitution,
      institutionsRepo,
      manager,
      managersRepo,
      professor,
      professorsRepo,
      student,
      studentsRepo,
      sut,
      user,
    } = makeSut();

    jest.spyOn(institutionsRepo, "findAllById").mockImplementationOnce(() =>
      Promise.resolve([anyInstitution])
    );
    jest.spyOn(managersRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([manager])
    );
    jest.spyOn(studentsRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([student])
    );
    jest.spyOn(professorsRepo, "findAllByUserId").mockImplementationOnce(() =>
      Promise.resolve([professor])
    );

    const result = sut.execute({ user });

    expect(result).rejects.toBeInstanceOf(
      Errors.UserNotRelatedWithAnyInstitution,
    );
  });
});
