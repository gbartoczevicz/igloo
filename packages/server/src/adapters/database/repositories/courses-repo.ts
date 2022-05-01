import { Course as PrismaCourse, PrismaClient } from "@prisma/client";

import { BaseRepo, CoursesRepo } from "~/contracts/database/repositories";
import { Course } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaCoursesRepo
  extends BaseRepo<PrismaClient, PrismaCourse, Course>
  implements CoursesRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(course: Course): Promise<void> {
    await this.client.client.course.upsert({
      create: {
        id: course.id.value,
        name: course.name,
        institutionId: course.institutionId.value,
      },
      update: {
        name: course.name,
        institutionId: course.institutionId.value,
      },
      where: {
        id: course.id.value,
      },
    });
  }

  public async findById(id: Id): Promise<Course | null> {
    const foundCourse = await this.client.client.course.findUnique({
      where: {
        id: id.value,
      },
    });

    return this.toEntity(foundCourse);
  }

  public async findAllByInstitutionId(institutionId: Id): Promise<Course[]> {
    const foundCourses = await this.client.client.course.findMany({
      where: {
        institutionId: institutionId.value,
      },
    });

    return foundCourses.map((foundCourse) =>
      this.toEntity(foundCourse)
    ) as Course[];
  }

  protected override toEntity(persisted: PrismaCourse | null): Course | null {
    if (!persisted) return null;

    return new Course(
      new Id(persisted.id),
      persisted.name,
      new Id(persisted.institutionId),
    );
  }
}
