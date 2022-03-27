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
