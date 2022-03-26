import { PrismaClient } from "@prisma/client";
import * as RepositoryAdapters from "~/adapters/database/repositories";
import * as HashAdapters from "~/adapters/hash";
import * as ValidatorAdapters from "~/adapters/validators";
import { Database } from "~/components/database";
import { SystemSetup } from "~/contracts/setup/system";
import * as DomainFactories from "~/domain/factories";

export function systemSetup(
  database: Database<PrismaClient>,
  hashSalt: number,
  tokenSecret: string,
  tokenExpiresAt: string | number,
): SystemSetup {
  const cnpjValidator = new ValidatorAdapters.CnpjValidatorImpl();
  const emailValidator = new ValidatorAdapters.EmailValidatorImpl();
  const phoneValidator = new ValidatorAdapters.PhoneValidatorImpl();
  const idProvider = new HashAdapters.NodeIdProvider();
  const passwordHandler = new HashAdapters.BcryptPasswordHandler(hashSalt);
  const tokenProvider = new HashAdapters.JwtTokenProvider(
    tokenSecret,
    tokenExpiresAt,
  );
  const institutionManagersRepo = new RepositoryAdapters.PrismaInstitutionManagersRepo(database.client);
  const institutionsRepo = new RepositoryAdapters.PrismaInstitutionsRepo(
    database.client,
  );
  const usersRepo = new RepositoryAdapters.PrismaUsersRepo(database.client);
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
    },
    validators: {
      cnpjValidator,
      emailValidator,
      phoneValidator,
    },
  };
}
