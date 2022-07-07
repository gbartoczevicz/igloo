import * as Factories from "~/domain/factories";
import * as Repositories from "../database/repositories";
import * as Hash from "../hash";
import * as Validators from "../validators";

export interface SystemSetup {
  repositories: {
    usersRepo: Repositories.UsersRepo;
    institutionsRepo: Repositories.InstitutionsRepo;
    institutionManagersRepo: Repositories.InstitutionManagersRepo;
    professorsRepo: Repositories.ProfessorsRepo;
    studentsRepo: Repositories.StudentsRepo;
    coursesRepo: Repositories.CoursesRepo;
    disciplinesRepo: Repositories.DisciplinesRepo;
    classCoursesRepo: Repositories.ClassCoursesRepo;
    studentClassRegistrationsRepo: Repositories.StudentClassRegistrationsRepo;
    professorClassRegistrationsRepo:
      Repositories.ProfessorClassRegistrationsRepo;
    learningTrailsRepo: Repositories.LearningTrailsRepo;
    learningTrailStepsRepo: Repositories.LearningTrailStepsRepo;
    examsRepo: Repositories.ExamsRepo;
  };
  factories: {
    cnpjFactory: Factories.CnpjFactory;
    emailFactory: Factories.EmailFactory;
    idFactory: Factories.IdFactory;
    institutionFactory: Factories.InstitutionFactory;
    passwordFactory: Factories.PasswordFactory;
    phoneFactory: Factories.PhoneFactory;
    sessionTokenFactory: Factories.SessionTokenFacotry;
    userFactory: Factories.UserFactory;
    managerFactory: Factories.InstitutionManagerFactory;
    professorFactory: Factories.ProfessorFactory;
    studentFactory: Factories.StudentFactory;
    courseFactory: Factories.CourseFactory;
    disciplineFactory: Factories.DisciplineFactory;
    classCourseFactory: Factories.ClassCourseFactory;
    studentClassRegistrationFactory: Factories.StudentClassRegistrationFactory;
    professorClassRegistrationFactory:
      Factories.ProfessorClassRegistrationFactory;
    learningTrailFactory: Factories.LearningTrailFactory;
    learningTrailStepFactory: Factories.LearningTrailStepFactory;
    examFactory: Factories.ExamFactory;
  };
  hash: {
    idProvider: Hash.IdProvider;
    passwordHandler: Hash.PasswordHandler;
    tokenProvider: Hash.TokenProvider;
  };
  validators: {
    cnpjValidator: Validators.CnpjValidator;
    emailValidator: Validators.EmailValidator;
    phoneValidator: Validators.PhoneValidator;
  };
}
