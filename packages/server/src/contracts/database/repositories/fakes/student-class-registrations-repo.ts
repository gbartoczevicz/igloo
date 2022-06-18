import { StudentClassRegistration } from "~/domain/entities";
import { StudentClassRegistrationsRepo } from "~/contracts/database/repositories";
import { Id } from "~/domain/entities/values";

export class FakeStudentClassRegistrationsRepo
  implements StudentClassRegistrationsRepo {
  public async save(_registration: StudentClassRegistration): Promise<void> {
    return Promise.resolve();
  }

  public async findByStudentAndClassCourse(
    _studentId: Id,
    _classCourseId: Id,
  ): Promise<StudentClassRegistration | null> {
    return Promise.resolve(null);
  }
}
