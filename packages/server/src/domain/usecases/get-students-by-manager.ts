import { StudentsRepo, UsersRepo } from "~/contracts/database/repositories";
import { InstitutionManager, StudentUserComposition } from "../entities";

export class GetStudentsByManagerUseCase {
  private readonly studentsRepo: StudentsRepo;

  private readonly usersRepo: UsersRepo;

  public constructor(
    studentsRepo: StudentsRepo,
    usersRepo: UsersRepo,
  ) {
    this.studentsRepo = studentsRepo;
    this.usersRepo = usersRepo;
  }

  public async execute(
    manager: InstitutionManager,
  ): Promise<StudentUserComposition[]> {
    const students = await this.studentsRepo.findAllByInstitution(
      manager.institutionId,
    );

    const users = await this.usersRepo.findAllById(
      students.map((student) => student.userId),
    );

    const result: StudentUserComposition[] = [];

    for (const student of students) {
      const userFound = users.find((user) => user.id.isEqual(student.userId));

      if (!userFound) {
        throw new Error(`User not found with student ${student.id.value}`);
      }

      result.push(
        new StudentUserComposition(student, userFound),
      );
    }

    return result;
  }
}
