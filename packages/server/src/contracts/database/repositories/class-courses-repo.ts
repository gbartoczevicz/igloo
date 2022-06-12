import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";

export interface ClassCoursesRepo {
  save(classCourse: ClassCourse): Promise<ClassCourse>;
  findByCourseIdAndStart(
    courseId: Id,
    start: ClassStartDate,
  ): Promise<ClassCourse | null>;
}
