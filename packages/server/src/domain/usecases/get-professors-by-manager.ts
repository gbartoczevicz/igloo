import { ProfessorsRepo, UsersRepo } from "~/contracts/database/repositories";
import { InstitutionManager, Professor, User } from "../entities";

type Result = Map<number, { user: User; professor: Professor }>;
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

  public async execute(manager: InstitutionManager): Promise<Result> {
    const professors = await this.professorsRepository.findAllByInstitution(
      manager.institutionId,
    );

    const users = await this.usersRepository.findAllById(
      professors.map((professor) => professor.id),
    );

    const result: Result = new Map();

    professors.forEach((professor, position) => {
      const userFound = users.find((user) => user.id.isEqual(professor.id));

      if (!userFound) {
        throw new Error(`User not found with professor ${professor.id.value}`);
      }

      result.set(position, { user: userFound, professor });
    });

    return result;
  }
}
