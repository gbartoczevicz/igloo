import {
  InstitutionManagersRepo,
  ProfessorsRepo,
  StudentsRepo,
} from "~/contracts/database/repositories";
import { UserRoles } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  userId: string;
  institutionId: string;
};

export class GetUserInstitutionRolesUseCase {
  private readonly idFactory: IdFactory;

  private readonly managersRepo: InstitutionManagersRepo;

  private readonly professorsRepo: ProfessorsRepo;

  private readonly studentsRepo: StudentsRepo;

  public constructor(
    idFactory: IdFactory,
    managersRepo: InstitutionManagersRepo,
    professorsRepo: ProfessorsRepo,
    studentsRepo: StudentsRepo,
  ) {
    this.idFactory = idFactory;
    this.managersRepo = managersRepo;
    this.professorsRepo = professorsRepo;
    this.studentsRepo = studentsRepo;
  }

  public async execute(params: Params): Promise<UserRoles> {
    const userId = this.idFactory.create(params.userId);
    const institutionId = this.idFactory.create(params.institutionId);

    const userRoles = await Promise.all([
      await this.managersRepo.findByInstitutionAndUser(institutionId, userId),
      await this.professorsRepo.findByInstitutionAndUser(institutionId, userId),
      await this.studentsRepo.findByInstitutionAndUser(institutionId, userId),
    ]);

    return new UserRoles(...userRoles);
  }
}
