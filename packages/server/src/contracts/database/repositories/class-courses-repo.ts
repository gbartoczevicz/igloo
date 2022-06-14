import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";

export interface ClassCoursesRepo {
  save(classCourse: ClassCourse): Promise<void>;
  findByCourseIdAndStart(
    courseId: Id,
    start: ClassStartDate,
  ): Promise<ClassCourse | null>;
  listByInstitutionId(institutionId: Id): Promise<ClassCourse[]>;
}
