import { ProfessorsRepo } from "~/contracts/database/repositories";
import { InstitutionManager, Professor } from "../entities";

export class GetProfessorsByManagerUseCase {
  private readonly professorsRepository: ProfessorsRepo;

  public constructor(professorsRepository: ProfessorsRepo) {
    this.professorsRepository = professorsRepository;
  }

  public async execute(manager: InstitutionManager): Promise<Professor[]> {
    return await this.professorsRepository.findAllByInstitution(
      manager.institutionId,
    );
  }
}
