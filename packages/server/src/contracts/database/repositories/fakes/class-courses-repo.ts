import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";
import { ClassCoursesRepo } from "../class-courses-repo";

export class FakeClassCoursesRepo implements ClassCoursesRepo {
  public async save(_classCourse: ClassCourse): Promise<void> {
  }

  public async findByCourseIdAndStart(
    _courseId: Id,
    _start: ClassStartDate,
  ): Promise<ClassCourse | null> {
    return null;
  }

  public async listByInstitutionId(_institutionId: Id): Promise<ClassCourse[]> {
    return Promise.resolve([]);
  }
}
