import { Course } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { CoursesRepo } from "../courses-repo";

export class FakeCoursesRepo implements CoursesRepo {
  public async save(_course: Course): Promise<void> {
  }

  public async findByIdAndInstitutionId(
    _id: Id,
    _institutionId: Id,
  ): Promise<Course | null> {
    return null;
  }

  public async findAllByInstitutionId(_institutionId: Id): Promise<Course[]> {
    return [];
  }
}
