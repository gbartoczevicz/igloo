import { Exam as PrismaExam, PrismaClient } from "@prisma/client";
import { BaseRepo, ExamsRepo } from "~/contracts/database/repositories";
import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaExamsRepo extends BaseRepo<PrismaClient, PrismaExam, Exam>
  implements ExamsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(exam: Exam): Promise<void> {
    await this.client.client.exam.upsert({
      create: {
        id: exam.id.value,
        learningTrailStepId: exam.learningTrailStepId.value,
      },
      update: {
        learningTrailStepId: exam.learningTrailStepId.value,
      },
      where: {
        id: exam.id.value,
      },
    });
  }

  public async findByLearningTrailStepId(
    learningTrailStepId: Id,
  ): Promise<Exam | null> {
    const persisted = await this.client.client.exam.findUnique({
      where: {
        learningTrailStepId: learningTrailStepId.value,
      },
    });

    return this.toEntity(persisted);
  }

  public async findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<Exam | null> {
    const persisted = await this.client.client.exam.findFirst({
      where: {
        id: id.value,
        learningTrailStep: {
          learningTrail: {
            discipline: {
              course: {
                institutionId: institutionId.value,
              },
            },
          },
        },
      },
    });

    return this.toEntity(persisted);
  }

  public async findAllByInstitutionId(institutionId: Id): Promise<Exam[]> {
    const persisted = await this.client.client.exam.findMany({
      where: {
        learningTrailStep: {
          learningTrail: {
            discipline: {
              course: {
                institutionId: institutionId.value,
              },
            },
          },
        },
      },
    });

    return persisted.map(this.toEntity) as Exam[];
  }

  protected toEntity(
    persisted: PrismaExam | null,
  ): Exam | null {
    if (!persisted) return null;

    return new Exam(
      new Id(persisted.id),
      new Id(persisted.learningTrailStepId),
    );
  }
}
