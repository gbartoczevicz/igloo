import { Discipline } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface DisciplinesRepo {
  save(discipline: Discipline): Promise<void>;
  findById(id: Id): Promise<Discipline | null>;
  findAllByCourseId(courseId: Id): Promise<Discipline[]>;
  findAllByCoursesId(coursesId: Id[]): Promise<Discipline[]>;
}
