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
  findById(id: Id): Promise<Student | null>;
}
