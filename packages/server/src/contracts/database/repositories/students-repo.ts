import { Student } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface StudentsRepo {
  save(student: Student): Promise<void>;
  findAllByUserId(userId: Id): Promise<Student[]>;
  findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<Student | null>;
  findAllByInstitution(institutionId: Id): Promise<Student[]>;
  findByIdAndInstitutionId(id: Id, institutionId: Id): Promise<Student | null>;
}
