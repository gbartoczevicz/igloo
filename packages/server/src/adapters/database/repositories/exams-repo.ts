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

  public async findById(id: Id): Promise<Exam | null> {
    const persisted = await this.client.client.exam.findUnique({
      where: {
        id: id.value,
      },
    });

    return this.toEntity(persisted);
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
