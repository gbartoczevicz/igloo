import { ProfessorClassRegistration } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ProfessorClassRegistrationsRepo {
  save(registration: ProfessorClassRegistration): Promise<void>;
  findByProfessorAndClassCourse(
    studentId: Id,
    classCourseId: Id,
  ): Promise<ProfessorClassRegistration | null>;
  findAllByInstitutionId(
    institutionId: Id,
  ): Promise<ProfessorClassRegistration[]>;
}
