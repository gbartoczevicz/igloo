import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";

export interface ClassCourseRepo {
  save(classCourse: ClassCourse): Promise<ClassCourse>;
  findByCourseIdAndStart(
    courseId: Id,
    start: ClassStartDate,
  ): Promise<ClassCourse | null>;
}
