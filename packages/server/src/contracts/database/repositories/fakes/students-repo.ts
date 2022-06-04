import { Student } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { StudentsRepo } from "../students-repo";

export class FakeStudentsRepo implements StudentsRepo {
  public async save(_student: Student): Promise<void> {
  }

  public async findAllByUserId(_userId: Id): Promise<Student[]> {
    return [];
  }

  public async findByInstitutionAndUser(
    _institutionId: Id,
    _userId: Id,
  ): Promise<Student | null> {
    return null;
  }

  public async findAllByInstitution(_institutionId: Id): Promise<Student[]> {
    return [];
  }
}
