import { Professor } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ProfessorsRepo {
  save(professor: Professor): Promise<void>;
  findAllByUserId(userId: Id): Promise<Professor[]>;
  findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<Professor | null>;
  findAllByInstitution(institutionId: Id): Promise<Professor[]>;
  findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<Professor | null>;
}
