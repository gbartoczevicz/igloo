import { InstitutionManager } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface InstitutionManagersRepo {
  save(manager: InstitutionManager): Promise<void>;
  findByInstitutionId(institutionId: Id): Promise<InstitutionManager | null>;
}
