import { CoursesRepo } from "~/contracts/database/repositories";
import { Course, InstitutionManager } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
};

export class GetInstitutionCoursesUseCase {
  private readonly idFactory: IdFactory;

  private readonly coursesRepo: CoursesRepo;

  public constructor(idFactory: IdFactory, coursesRepo: CoursesRepo) {
    this.coursesRepo = coursesRepo;
    this.idFactory = idFactory;
  }

  public async execute(params: Params): Promise<Course[]> {
    const id = this.idFactory.create(params.institutionId);

    return await this.coursesRepo.findAllByInstitutionId(id);
  }
}
