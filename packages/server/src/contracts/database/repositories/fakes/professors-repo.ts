import { Professor } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { ProfessorsRepo } from "../professors-repo";

export class FakeProfessorsRepo implements ProfessorsRepo {
  public async save(_professor: Professor): Promise<void> {
  }

  public async findAllByUserId(_userId: Id): Promise<Professor[]> {
    return [];
  }

  public async findByInstitutionAndUser(
    _institutionId: Id,
    _userId: Id,
  ): Promise<Professor | null> {
    return null;
  }

  public async findAllByInstitution(_institutionId: Id): Promise<Professor[]> {
    return [];
  }
}
