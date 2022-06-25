import { PrismaClient } from "@prisma/client";
import * as RepositoryAdapters from "~/adapters/database/repositories";
import * as HashAdapters from "~/adapters/hash";
import * as ValidatorAdapters from "~/adapters/validators";
import { Database } from "~/components/database";
import { ApplicationConfig } from "~/config";
import { SystemSetup } from "~/contracts/setup/system";
import * as DomainFactories from "~/domain/factories";

export function systemSetup(
  config: ApplicationConfig,
  database: Database<PrismaClient>,
): SystemSetup {
  const cnpjValidator = new ValidatorAdapters.CnpjValidatorImpl();
  const emailValidator = new ValidatorAdapters.EmailValidatorImpl();
  const phoneValidator = new ValidatorAdapters.PhoneValidatorImpl();
  const idProvider = new HashAdapters.NodeIdProvider();
  const passwordHandler = new HashAdapters.BcryptPasswordHandler(
    config.hashSalt,
  );
  const tokenProvider = new HashAdapters.JwtTokenProvider(
    config.tokenSecret,
    config.tokenExpiresAt,
  );
  const institutionManagersRepo = new RepositoryAdapters
    .PrismaInstitutionManagersRepo(database.client);
  const institutionsRepo = new RepositoryAdapters.PrismaInstitutionsRepo(
    database.client,
  );
  const professorsRepo = new RepositoryAdapters.PrismaProfessorsRepo(
    database.client,
  );
  const studentsRepo = new RepositoryAdapters.PrismaStudentsRepo(
    database.client,
  );
  const usersRepo = new RepositoryAdapters.PrismaUsersRepo(database.client);
  const coursesRepo = new RepositoryAdapters.PrismaCoursesRepo(database.client);
  const disciplinesRepo = new RepositoryAdapters.PrismaDisciplinesRepo(
    database.client,
  );
  const classCoursesRepo = new RepositoryAdapters.PrismaClassCoursesRepo(
    database.client,
  );
  const studentClassRegistrationsRepo = new RepositoryAdapters
    .PrismaStudentClassRegistrationsRepo(database.client);
  const professorClassRegistrationsRepo = new RepositoryAdapters
    .PrismaProfessorClassRegistrationsRepo(database.client);

  const cnpjFactory = new DomainFactories.CnpjFactory(cnpjValidator);
  const emailFactory = new DomainFactories.EmailFactory(emailValidator);
  const idFactory = new DomainFactories.IdFactory(idProvider);
  const phoneFactory = new DomainFactories.PhoneFactory(phoneValidator);
  const institutionFactory = new DomainFactories.InstitutionFactory(
    idFactory,
    phoneFactory,
    cnpjFactory,
  );
  const passwordFactory = new DomainFactories.PasswordFactory(passwordHandler);
  const sessionTokenFactory = new DomainFactories.SessionTokenFacotry(
    tokenProvider,
  );
  const userFactory = new DomainFactories.UserFactory(
    idFactory,
    emailFactory,
    passwordFactory,
    phoneFactory,
  );
  const managerFactory = new DomainFactories.InstitutionManagerFactory(
    idFactory,
  );
  const professorFactory = new DomainFactories.ProfessorFactory(idFactory);
  const studentFactory = new DomainFactories.StudentFactory(idFactory);
  const courseFactory = new DomainFactories.CourseFactory(idFactory);
  const disciplineFactory = new DomainFactories.DisciplineFactory(idFactory);
  const classCourseFactory = new DomainFactories.ClassCourseFactory(idFactory);
  const studentClassRegistrationFactory = new DomainFactories
    .StudentClassRegistrationFactory(idFactory);
  const professorClassRegistrationFactory = new DomainFactories
    .ProfessorClassRegistrationFactory(idFactory);

  return {
    factories: {
      cnpjFactory,
      emailFactory,
      idFactory,
      institutionFactory,
      passwordFactory,
      phoneFactory,
      sessionTokenFactory,
      userFactory,
      managerFactory,
      professorFactory,
      studentFactory,
      courseFactory,
      disciplineFactory,
      classCourseFactory,
      studentClassRegistrationFactory,
      professorClassRegistrationFactory,
    },
    hash: {
      idProvider,
      passwordHandler,
      tokenProvider,
    },
    repositories: {
      institutionManagersRepo,
      institutionsRepo,
      usersRepo,
      professorsRepo,
      studentsRepo,
      coursesRepo,
      disciplinesRepo,
      classCoursesRepo,
      studentClassRegistrationsRepo,
      professorClassRegistrationsRepo,
    },
    validators: {
      cnpjValidator,
      emailValidator,
      phoneValidator,
    },
  };
}
