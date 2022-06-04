import { SystemSetup } from "~/contracts/setup/system";
import * as FakeRepo from "~/contracts/database/repositories/fakes";
import * as FakeHash from "~/contracts/hash/fakes";
import * as FakeValidator from "~/contracts/validators/fakes";
import * as Factories from "~/domain/factories";

export function systemTestSetup(): SystemSetup {
  const idProvider = new FakeHash.FakeIdProvider();
  const passwordHandler = new FakeHash.FakePasswordHandler(8);
  const tokenProvider = new FakeHash.FakeTokenProvider("secret", 1);

  const emailValidator = new FakeValidator.FakeEmailValidator();
  const phoneValidator = new FakeValidator.FakePhoneValidator();
  const cnpjValidator = new FakeValidator.FakeCnpjValidator();

  const idFactory = new Factories.IdFactory(idProvider);
  const emailFactory = new Factories.EmailFactory(emailValidator);
  const passwordFactory = new Factories.PasswordFactory(passwordHandler);
  const phoneFactory = new Factories.PhoneFactory(phoneValidator);
  const cnpjFactory = new Factories.CnpjFactory(cnpjValidator);
  const courseFactory = new Factories.CourseFactory(idFactory);
  const disciplineFactory = new Factories.DisciplineFactory(idFactory);
  const institutionFactory = new Factories.InstitutionFactory(
    idFactory,
    phoneFactory,
    cnpjFactory,
  );
  const managerFactory = new Factories.InstitutionManagerFactory(idFactory);
  const professorFactory = new Factories.ProfessorFactory(idFactory);
  const sessionTokenFactory = new Factories.SessionTokenFacotry(tokenProvider);
  const studentFactory = new Factories.StudentFactory(idFactory);

  const userFactory = new Factories.UserFactory(
    idFactory,
    emailFactory,
    passwordFactory,
    phoneFactory,
  );

  return {
    hash: {
      idProvider,
      passwordHandler,
      tokenProvider,
    },
    factories: {
      userFactory,
      emailFactory,
      passwordFactory,
      phoneFactory,
      cnpjFactory,
      courseFactory,
      disciplineFactory,
      idFactory,
      institutionFactory,
      managerFactory,
      professorFactory,
      sessionTokenFactory,
      studentFactory,
    },
    repositories: {
      usersRepo: new FakeRepo.FakeUsersRepo(),
      coursesRepo: new FakeRepo.FakeCoursesRepo(),
      disciplinesRepo: new FakeRepo.FakeDisciplinesRepo(),
      institutionManagersRepo: new FakeRepo.FakeInstitutionManagersRepo(),
      institutionsRepo: new FakeRepo.FakeInstitutionsRepo(),
      professorsRepo: new FakeRepo.FakeProfessorsRepo(),
      studentsRepo: new FakeRepo.FakeStudentsRepo(),
    },
    validators: {
      cnpjValidator,
      emailValidator,
      phoneValidator,
    },
  };
}
