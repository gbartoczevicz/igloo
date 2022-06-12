import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";
import { ClassCoursesRepo } from "../class-courses-repo";

export class FakeClassCoursesRepo implements ClassCoursesRepo {
  public async save(classCourse: ClassCourse): Promise<ClassCourse> {
    return classCourse;
  }

  public async findByCourseIdAndStart(
    _courseId: Id,
    _start: ClassStartDate,
  ): Promise<ClassCourse | null> {
    return null;
  }
}
