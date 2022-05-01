import { Discipline as PrismaDiscipline, PrismaClient } from "@prisma/client";
import { BaseRepo, DisciplinesRepo } from "~/contracts/database/repositories";
import { Discipline } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaDisciplinesRepo
  extends BaseRepo<PrismaClient, PrismaDiscipline, Discipline>
  implements DisciplinesRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(discipline: Discipline): Promise<void> {
    await this.client.client.discipline.upsert({
      create: {
        id: discipline.id.value,
        name: discipline.name,
        courseId: discipline.courseId.value,
      },
      update: {
        name: discipline.name,
        courseId: discipline.courseId.value,
      },
      where: {
        id: discipline.id.value,
      },
    });
  }

  public async findAllByCourseId(courseId: Id): Promise<Discipline[]> {
    const disciplinesFound = await this.client.client.discipline.findMany({
      where: {
        courseId: courseId.value,
      },
    });

    return disciplinesFound.map((discipline) =>
      this.toEntity(discipline)
    ) as Discipline[];
  }

  public async findAllByCoursesId(coursesId: Id[]): Promise<Discipline[]> {
    const disciplinesFound = await this.client.client.discipline.findMany({
      where: {
        courseId: {
          in: coursesId.map((courseId) => courseId.value),
        },
      },
    });

    return disciplinesFound.map((discipline) =>
      this.toEntity(discipline)
    ) as Discipline[];
  }

  protected toEntity(persisted: PrismaDiscipline | null): Discipline | null {
    if (!persisted) return null;

    return new Discipline(
      new Id(persisted.id),
      persisted.name,
      new Id(persisted.courseId),
    );
  }
}
