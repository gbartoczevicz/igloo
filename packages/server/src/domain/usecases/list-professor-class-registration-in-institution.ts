import { ProfessorClassRegistrationsRepo } from "~/contracts/database/repositories";
import { ProfessorClassRegistration } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
};

export class ListProfessorClassRegistrationInInstitutionUseCase {
  private readonly idFactory: IdFactory;

  private readonly registrationsRepo: ProfessorClassRegistrationsRepo;

  public constructor(
    idFactory: IdFactory,
    registrationsRepo: ProfessorClassRegistrationsRepo,
  ) {
    this.idFactory = idFactory;
    this.registrationsRepo = registrationsRepo;
  }

  public async execute(params: Params): Promise<ProfessorClassRegistration[]> {
    const id = this.idFactory.create(params.institutionId);

    return await this.registrationsRepo.findAllByInstitutionId(id);
  }
}
