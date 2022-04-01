import { PrismaClient, Student as PrismaStudent } from "@prisma/client";
import { BaseRepo, StudentsRepo } from "~/contracts/database/repositories";
import { Student } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaStudentsRepo
  extends BaseRepo<PrismaClient, PrismaStudent, Student>
  implements StudentsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(student: Student): Promise<void> {
    await this.client.client.student.upsert({
      create: {
        id: student.id.value,
        institutionId: student.institutionId.value,
        userId: student.userId.value,
      },
      update: {
        institutionId: student.institutionId.value,
        userId: student.userId.value,
      },
      where: { id: student.id.value },
    });
  }

  public async findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<Student | null> {
    const studentFound = await this.client.client.student.findUnique({
      where: {
        userId_institutionId: {
          institutionId: institutionId.value,
          userId: userId.value,
        },
      },
    });

    return this.toEntity(studentFound);
  }

  public async findAllByInstitution(institutionId: Id): Promise<Student[]> {
    const studentsFound = await this.client.client.student.findMany({
      where: { institutionId: institutionId.value },
    });

    return studentsFound.map((student) => this.toEntity(student)) as Student[];
  }

  protected override toEntity(
    persisted: PrismaStudent | null,
  ): Student | null {
    if (!persisted) return null;

    return new Student(
      new Id(persisted.id),
      new Id(persisted.userId),
      new Id(persisted.institutionId),
    );
  }
}
