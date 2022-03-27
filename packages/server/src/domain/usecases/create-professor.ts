import {
  ProfessorsRepo,
  InstitutionsRepo,
} from "~/contracts/database/repositories";
import { DomainError } from "~/errors";
import { Institution, Professor, User } from "../entities";
import { ProfessorFactory } from "../factories";

export class CreateProfessorUseCase {
  private readonly professorsRepo: ProfessorsRepo;

  private readonly institutionsRepo: InstitutionsRepo;

  private readonly professorFactory: ProfessorFactory;

  public constructor(
    professorsRepo: ProfessorsRepo,
    institutionsRepo: InstitutionsRepo,
    professorFactory: ProfessorFactory,
  ) {
    this.professorsRepo = professorsRepo;
    this.institutionsRepo = institutionsRepo;
    this.professorFactory = professorFactory;
  }

  public async execute(
    user: User,
    institution: Institution,
  ): Promise<Professor> {
    const doesInstitutionExists = await this.institutionsRepo.findById(
      institution.id,
    );

    if (!doesInstitutionExists) {
      throw new DomainError("The institution does not exists");
    }

    const alreadyRegistered = await this.professorsRepo
      .findByInstitutionAndUser(institution.id, user.id);
      
    if (alreadyRegistered) {
      throw new DomainError("The professor is already created in this institution");
    }

    const professor = this.professorFactory.create({
      institution: doesInstitutionExists,
      user,
    });

    await this.professorsRepo.save(professor);

    return professor;
  }
}
