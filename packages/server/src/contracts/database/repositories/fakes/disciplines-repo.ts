import { Discipline } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { DisciplinesRepo } from "../disciplines-repo";

export class FakeDisciplinesRepo implements DisciplinesRepo {
  public async save(_discipline: Discipline): Promise<void> {
  }

  public async findAllByCourseId(_courseId: Id): Promise<Discipline[]> {
    return [];
  }

  public async findAllByCoursesId(coursesId: Id[]): Promise<Discipline[]> {
    return [];
  }
}
