import {
  ClassCoursesRepo,
  CoursesRepo,
} from "~/contracts/database/repositories";
import { ClassCourse } from "../entities";
import { ClassCourseFactory } from "../factories";
import * as Errors from "~/domain/errors";

type Params = {
  name: string;
  courseId: string;
  start: {
    year: number;
    month: number;
  };
};

export class CreateClassCourseUseCase {
  private readonly classCourseFactory: ClassCourseFactory;

  private readonly classCoursesRepo: ClassCoursesRepo;

  private readonly coursesRepo: CoursesRepo;

  public constructor(
    classCourseFactory: ClassCourseFactory,
    classCourseRepo: ClassCoursesRepo,
    coursesRepo: CoursesRepo,
  ) {
    this.classCourseFactory = classCourseFactory;
    this.classCoursesRepo = classCourseRepo;
    this.coursesRepo = coursesRepo;
  }

  public async execute(params: Params): Promise<ClassCourse> {
    const classCourse = this.classCourseFactory.create(params);

    const classCourseFound = await this.classCoursesRepo.findByCourseIdAndStart(
      classCourse.courseId,
      classCourse.start,
    );

    if (classCourseFound) {
      throw new Errors.ClassCourseWithSameCourseAndStartAlreadyCreated();
    }

    const courseFound = await this.coursesRepo.findById(classCourse.courseId);

    if (!courseFound) {
      throw new Errors.CourseNotExists();
    }

    await this.classCoursesRepo.save(classCourse);

    return classCourse;
  }
}
