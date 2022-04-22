import { ProfessorsRepo, UsersRepo } from "~/contracts/database/repositories";
import { DomainError } from "~/errors";
import { InstitutionManager, Professor } from "../entities";
import { IdFactory, ProfessorFactory } from "../factories";

type Params = {
  professorUserId: string;
  manager: InstitutionManager;
};

export class CreateProfessorUseCase {
  private readonly professorsRepo: ProfessorsRepo;

  private readonly usersRepo: UsersRepo;

  private readonly professorFactory: ProfessorFactory;

  private readonly idFactory: IdFactory;

  public constructor(
    professorsRepo: ProfessorsRepo,
    usersRepo: UsersRepo,
    professorFactory: ProfessorFactory,
    idFactory: IdFactory,
  ) {
    this.professorsRepo = professorsRepo;
    this.usersRepo = usersRepo;
    this.professorFactory = professorFactory;
    this.idFactory = idFactory;
  }

  public async execute(incoming: Params): Promise<Professor> {
    const { manager } = incoming;

    const professorUserId = this.idFactory.create(incoming.professorUserId);

    const alreadyRegistered = await this.professorsRepo
      .findByInstitutionAndUser(manager.institutionId, professorUserId);

    if (alreadyRegistered) {
      throw new DomainError(
        "The professor is already created in this institution",
      );
    }

    const userExists = await this.usersRepo.findById(professorUserId);

    if (!userExists) {
      throw new DomainError("User to be professor does not exists");
    }

    const professor = this.professorFactory.create({
      institutionId: manager.institutionId,
      userId: professorUserId,
    });

    await this.professorsRepo.save(professor);

    return professor;
  }
}
