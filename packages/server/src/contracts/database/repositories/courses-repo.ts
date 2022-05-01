import { Course } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface CoursesRepo {
  save(course: Course): Promise<void>;
  findById(id: Id): Promise<Course | null>;
  findAllByInstitutionId(institutionId: Id): Promise<Course[]>;
}
