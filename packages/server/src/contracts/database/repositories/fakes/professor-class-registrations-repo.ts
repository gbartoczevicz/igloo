import { ProfessorClassRegistration } from "~/domain/entities";
import { ProfessorClassRegistrationsRepo } from "~/contracts/database/repositories";
import { Id } from "~/domain/entities/values";

export class FakeProfessorClassRegistrationsRepo
  implements ProfessorClassRegistrationsRepo {
  public async save(_registration: ProfessorClassRegistration): Promise<void> {
    return Promise.resolve();
  }

  public async findByProfessorAndClassCourse(
    _studentId: Id,
    _classCourseId: Id,
  ): Promise<ProfessorClassRegistration | null> {
    return Promise.resolve(null);
  }

  public async findAllByInstitutionId(
    _institutionId: Id,
  ): Promise<ProfessorClassRegistration[]> {
    return Promise.resolve([]);
  }
}
