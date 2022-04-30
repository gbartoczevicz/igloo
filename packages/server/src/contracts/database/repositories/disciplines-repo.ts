import { Discipline } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface DisciplinesRepo {
  save(discipline: Discipline): Promise<void>;
  findAllByCourseId(courseId: Id): Promise<Discipline[]>;
}
