import { CoursesRepo } from "~/contracts/database/repositories";
import { Course } from "../entities";
import { Id } from "../entities/values";
import { IdFactory } from "../factories";

type Params = {
  courseId: string;
  institutionId: Id;
};

export class GetCourseByIdAndInstitutionUseCase {
  private readonly coursesRepo: CoursesRepo;

  private readonly idFactory: IdFactory;

  public constructor(coursesRepo: CoursesRepo, idFactory: IdFactory) {
    this.coursesRepo = coursesRepo;
    this.idFactory = idFactory;
  }

  public async execute(params: Params): Promise<Course | null> {
    const courseId = this.idFactory.create(params.courseId);

    return await this.coursesRepo.findByIdAndInstitutionId(
      courseId,
      params.institutionId,
    );
  }
}
