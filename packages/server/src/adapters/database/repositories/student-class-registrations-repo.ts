import {
  PrismaClient,
  StudentClassCourseRegistration as PrismaStudentClassCourseRegistration,
} from "@prisma/client";

import {
  BaseRepo,
  StudentClassRegistrationsRepo,
} from "~/contracts/database/repositories";
import { StudentClassRegistration } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaStudentClassRegistrationsRepo extends BaseRepo<
  PrismaClient,
  PrismaStudentClassCourseRegistration,
  StudentClassRegistration
> implements StudentClassRegistrationsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(registration: StudentClassRegistration): Promise<void> {
    await this.client.client.studentClassCourseRegistration.upsert({
      create: {
        id: registration.id.value,
        classCourseId: registration.classCourseId.value,
        studentId: registration.studentId.value,
      },
      update: {
        classCourseId: registration.classCourseId.value,
        studentId: registration.studentId.value,
      },
      where: {
        id: registration.id.value,
      },
    });
  }

  public async findByStudentAndClassCourse(
    studentId: Id,
    classCourseId: Id,
  ): Promise<StudentClassRegistration | null> {
    const persisted = await this.client.client.studentClassCourseRegistration
      .findFirst({
        where: {
          studentId: studentId.value,
          classCourseId: classCourseId.value,
        },
      });

    return this.toEntity(persisted);
  }

  protected override toEntity(
    persisted: PrismaStudentClassCourseRegistration | null,
  ): StudentClassRegistration | null {
    if (!persisted) return null;

    return new StudentClassRegistration(
      new Id(persisted.id),
      new Id(persisted.studentId),
      new Id(persisted.classCourseId),
    );
  }
}
