import {
  PrismaClient,
  ProfessorClassCourseRegistration as PrismaProfessorClassCourseRegistration,
} from "@prisma/client";

import {
  BaseRepo,
  ProfessorClassRegistrationsRepo,
} from "~/contracts/database/repositories";
import { ProfessorClassRegistration } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaProfessorClassRegistrationsRepo extends BaseRepo<
  PrismaClient,
  PrismaProfessorClassCourseRegistration,
  ProfessorClassRegistration
> implements ProfessorClassRegistrationsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(registration: ProfessorClassRegistration): Promise<void> {
    await this.client.client.professorClassCourseRegistration.upsert({
      create: {
        id: registration.id.value,
        classCourseId: registration.classCourseId.value,
        professorId: registration.professorId.value,
      },
      update: {
        classCourseId: registration.classCourseId.value,
        professorId: registration.professorId.value,
      },
      where: {
        id: registration.id.value,
      },
    });
  }

  public async findByProfessorAndClassCourse(
    professorId: Id,
    classCourseId: Id,
  ): Promise<ProfessorClassRegistration | null> {
    const persisted = await this.client.client.professorClassCourseRegistration
      .findFirst({
        where: {
          professorId: professorId.value,
          classCourseId: classCourseId.value,
        },
      });

    return this.toEntity(persisted);
  }

  public async findAllByInstitutionId(
    institutionId: Id,
  ): Promise<ProfessorClassRegistration[]> {
    const persisted = await this.client.client.professorClassCourseRegistration
      .findMany({
        where: {
          professor: {
            institutionId: institutionId.value,
          },
        },
      });

    return persisted.map(this.toEntity) as ProfessorClassRegistration[];
  }

  protected override toEntity(
    persisted: PrismaProfessorClassCourseRegistration | null,
  ): ProfessorClassRegistration | null {
    if (!persisted) return null;

    return new ProfessorClassRegistration(
      new Id(persisted.id),
      new Id(persisted.professorId),
      new Id(persisted.classCourseId),
    );
  }
}
