import { Professor } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ProfessorsRepo {
  save(professor: Professor): Promise<void>;
  findByInstitutionAndUser(institutionId: Id, userId: Id): Promise<Professor | null>;
}
