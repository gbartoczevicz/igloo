import { ProfessorsRepo, UsersRepo } from "~/contracts/database/repositories";
import { InstitutionManager, ProfessorUserComposition } from "../entities";

export class GetProfessorsByManagerUseCase {
  private readonly professorsRepository: ProfessorsRepo;

  private readonly usersRepository: UsersRepo;

  public constructor(
    professorsRepository: ProfessorsRepo,
    usersRepository: UsersRepo,
  ) {
    this.professorsRepository = professorsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute(
    manager: InstitutionManager,
  ): Promise<ProfessorUserComposition[]> {
    const professors = await this.professorsRepository.findAllByInstitution(
      manager.institutionId,
    );

    const users = await this.usersRepository.findAllById(
      professors.map((professor) => professor.userId),
    );

    const result: ProfessorUserComposition[] = [];

    for (const professor of professors) {
      const userFound = users.find((user) => user.id.isEqual(professor.userId));

      if (!userFound) {
        throw new Error(`User not found with professor ${professor.id.value}`);
      }

      result.push(
        new ProfessorUserComposition(professor, userFound),
      );
    }

    return result;
  }
}
