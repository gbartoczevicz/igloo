import { Course } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface CoursesRepo {
  save(course: Course): Promise<void>;
  findAllByInstitutionId(institutionId: Id): Promise<Course[]>;
}
