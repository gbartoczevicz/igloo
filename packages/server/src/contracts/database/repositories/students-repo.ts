import { Student } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface StudentsRepo {
  save(student: Student): Promise<void>;
  findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<Student | null>;
}
