import { StudentClassRegistration } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface StudentClassRegistrationsRepo {
  save(registration: StudentClassRegistration): Promise<void>;
  findByStudentAndClassCourse(
    studentId: Id,
    classCourseId: Id,
  ): Promise<StudentClassRegistration | null>;
}
