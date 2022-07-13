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
  const classCourseFactory = new Factories.ClassCourseFactory(idFactory);
  const studentClassRegistrationFactory = new Factories
    .StudentClassRegistrationFactory(idFactory);
  const professorClassRegistrationFactory = new Factories
    .ProfessorClassRegistrationFactory(idFactory);
  const learningTrailFactory = new Factories.LearningTrailFactory(idFactory);
  const learningTrailStepFactory = new Factories.LearningTrailStepFactory(
    idFactory,
  );
  const examFactory = new Factories.ExamFactory(
    idFactory,
  );
  const examQuestionFactory = new Factories.ExamQuestionFactory(idFactory);

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
      classCourseFactory,
      studentClassRegistrationFactory,
      professorClassRegistrationFactory,
      learningTrailFactory,
      learningTrailStepFactory,
      examFactory,
      examQuestionFactory,
    },
    repositories: {
      usersRepo: new FakeRepo.FakeUsersRepo(),
      coursesRepo: new FakeRepo.FakeCoursesRepo(),
      disciplinesRepo: new FakeRepo.FakeDisciplinesRepo(),
      institutionManagersRepo: new FakeRepo.FakeInstitutionManagersRepo(),
      institutionsRepo: new FakeRepo.FakeInstitutionsRepo(),
      professorsRepo: new FakeRepo.FakeProfessorsRepo(),
      studentsRepo: new FakeRepo.FakeStudentsRepo(),
      classCoursesRepo: new FakeRepo.FakeClassCoursesRepo(),
      studentClassRegistrationsRepo: new FakeRepo
        .FakeStudentClassRegistrationsRepo(),
      professorClassRegistrationsRepo: new FakeRepo
        .FakeProfessorClassRegistrationsRepo(),
      learningTrailsRepo: new FakeRepo.FakeLearningTrailsRepo(),
      learningTrailStepsRepo: new FakeRepo.FakeLearningTrailStepsRepo(),
      examsRepo: new FakeRepo.FakeExamsRepo(),
      examQuestionsRepo: new FakeRepo.FakeExamQuestionsRepo(),
      assertiveQuestionOptionsRepo: new FakeRepo
        .FakeAssertiveQuestionOptionsRepo(),
      assertiveQuestionsRepo: new FakeRepo.FakeAssertiveQuestionsRepo(),
      essayQuestionsRepo: new FakeRepo.FakeEssayQuestionsRepo(),
    },
    validators: {
      cnpjValidator,
      emailValidator,
      phoneValidator,
    },
  };
}
