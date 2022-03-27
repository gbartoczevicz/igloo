import { Professor } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ProfessorsRepo {
  save(professor: Professor): Promise<void>;
  findByInstitutionId(institutionId: Id): Promise<Professor | null>;
}
