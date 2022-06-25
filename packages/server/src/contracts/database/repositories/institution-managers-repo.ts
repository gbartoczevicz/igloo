import { InstitutionManager } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface InstitutionManagersRepo {
  save(manager: InstitutionManager): Promise<void>;
  findAllByUserId(userId: Id): Promise<InstitutionManager[]>;
  findByInstitutionId(institutionId: Id): Promise<InstitutionManager | null>;
  findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<InstitutionManager | null>;
}
