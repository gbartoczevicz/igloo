import { InstitutionManager } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { InstitutionManagersRepo } from "../institution-managers-repo";

export class FakeInstitutionManagersRepo implements InstitutionManagersRepo {
  public async save(_manager: InstitutionManager): Promise<void> {
  }

  public async findAllByUserId(_userId: Id): Promise<InstitutionManager[]> {
    return [];
  }

  public async findByInstitutionId(
    _institutionId: Id,
  ): Promise<InstitutionManager | null> {
    return null;
  }

  public async findByInstitutionAndUser(
    _institutionId: Id,
    _suserId: Id,
  ): Promise<InstitutionManager | null> {
    return Promise.resolve(null);
  }
}
