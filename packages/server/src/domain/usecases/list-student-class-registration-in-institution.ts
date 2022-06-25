import { StudentClassRegistrationsRepo } from "~/contracts/database/repositories";
import { StudentClassRegistration } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
};

export class ListStudentClassRegistrationInInstitutionUseCase {
  private readonly idFactory: IdFactory;

  private readonly registrationsRepo: StudentClassRegistrationsRepo;

  public constructor(
    idFactory: IdFactory,
    registrationsRepo: StudentClassRegistrationsRepo,
  ) {
    this.idFactory = idFactory;
    this.registrationsRepo = registrationsRepo;
  }

  public async execute(params: Params): Promise<StudentClassRegistration[]> {
    const id = this.idFactory.create(params.institutionId);

    return await this.registrationsRepo.findAllByInstitutionId(id);
  }
}
