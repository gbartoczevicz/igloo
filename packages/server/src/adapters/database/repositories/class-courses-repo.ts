import { ClassCourse as PrismaClassCourse, PrismaClient } from "@prisma/client";

import { BaseRepo, ClassCoursesRepo } from "~/contracts/database/repositories";
import { ClassCourse } from "~/domain/entities";
import { ClassStartDate, Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaClassCoursesRepo
  extends BaseRepo<PrismaClient, PrismaClassCourse, ClassCourse>
  implements ClassCoursesRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(classCourse: ClassCourse): Promise<void> {
    await this.client.client.classCourse.upsert({
      create: {
        id: classCourse.id.value,
        name: classCourse.name,
        start: classCourse.start.date,
        courseId: classCourse.courseId.value,
      },
      update: {
        name: classCourse.name,
        start: classCourse.start.date,
        courseId: classCourse.courseId.value,
      },
      where: {
        id: classCourse.id.value,
      },
    });
  }

  public async findByCourseIdAndStart(
    courseId: Id,
    start: ClassStartDate,
  ): Promise<ClassCourse | null> {
    const persisted = await this.client.client.classCourse.findUnique({
      where: {
        start_courseId: {
          courseId: courseId.value,
          start: start.date,
        },
      },
    });

    return this.toEntity(persisted);
  }

  public async listByInstitutionId(institutionId: Id): Promise<ClassCourse[]> {
    const persisted = await this.client.client.classCourse.findMany({
      where: {
        course: {
          institutionId: institutionId.value,
        },
      },
    });

    return persisted.map(this.toEntity) as ClassCourse[];
  }

  protected override toEntity(
    persisted: PrismaClassCourse | null,
  ): ClassCourse | null {
    if (!persisted) return null;

    return new ClassCourse(
      new Id(persisted.id),
      new Id(persisted.courseId),
      persisted.name,
      new ClassStartDate(persisted.start),
    );
  }
}
