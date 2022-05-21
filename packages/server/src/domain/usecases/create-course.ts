import { CoursesRepo } from "~/contracts/database/repositories";
import { Course, InstitutionManager } from "../entities";
import { CourseFactory } from "../factories";
import * as Errors from "~/domain/errors";

type Params = {
  name: string;
  manager: InstitutionManager;
};

export class CreateCourseUseCase {
  private readonly courseFactory: CourseFactory;

  private readonly coursesRepo: CoursesRepo;

  public constructor(courseFactory: CourseFactory, coursesRepo: CoursesRepo) {
    this.courseFactory = courseFactory;
    this.coursesRepo = coursesRepo;
  }

  public async execute(params: Params): Promise<Course> {
    const course = this.courseFactory.create({
      name: params.name,
      institutionId: params.manager.institutionId.value,
    });

    const registeredCourses = await this.coursesRepo.findAllByInstitutionId(
      course.institutionId,
    );

    const withSameName = registeredCourses.find((registeredCourse) =>
      registeredCourse.name.toLowerCase() === course.name.toLowerCase()
    );

    if (withSameName) {
      throw new Errors.CourseNameAlreadyInUse();
    }

    await this.coursesRepo.save(course);

    return course;
  }
}
