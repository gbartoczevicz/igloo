import { CoursesRepo } from "~/contracts/database/repositories";
import { Course, InstitutionManager } from "../entities";

export class GetInstitutionCoursesUseCase {
  private readonly coursesRepo: CoursesRepo;

  public constructor(coursesRepo: CoursesRepo) {
    this.coursesRepo = coursesRepo;
  }

  public async execute(manager: InstitutionManager): Promise<Course[]> {
    return await this.coursesRepo.findAllByInstitutionId(manager.institutionId);
  }
}
