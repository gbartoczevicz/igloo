import { Discipline } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface DisciplinesRepo {
  save(discipline: Discipline): Promise<void>;
  findAllByInstitutionId(institutionId: Id): Promise<Discipline[]>;
}
