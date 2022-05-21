import { CoursesRepo } from "~/contracts/database/repositories";
import { Course } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  courseId: string;
};

export class GetCourseUseCase {
  private readonly idFactory: IdFactory;

  private readonly coursesRepo: CoursesRepo;

  public constructor(idFactory: IdFactory, coursesRepo: CoursesRepo) {
    this.idFactory = idFactory;
    this.coursesRepo = coursesRepo;
  }

  public async execute(params: Params): Promise<Course | null> {
    const id = this.idFactory.create(params.courseId);

    return await this.coursesRepo.findById(id);
  }
}
