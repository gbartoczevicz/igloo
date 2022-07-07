import {
  LearningTrailStep as PrismaLearningTrailStep,
  PrismaClient,
} from "@prisma/client";
import {
  BaseRepo,
  LearningTrailStepsRepo,
} from "~/contracts/database/repositories";
import { LearningTrailStep } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaLearningTrailStepsRepo
  extends BaseRepo<PrismaClient, PrismaLearningTrailStep, LearningTrailStep>
  implements LearningTrailStepsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(step: LearningTrailStep): Promise<void> {
    const { id, learningTrailId, ...delegate } = step;

    await this.client.client.learningTrailStep.upsert({
      create: {
        ...delegate,
        id: id.value,
        learningTrailId: learningTrailId.value,
      },
      update: {
        ...delegate,
        learningTrailId: learningTrailId.value,
      },
      where: {
        id: step.id.value,
      },
    });
  }

  public async findByLearningTrailIdAndPosition(
    learningTrailId: Id,
    position: number,
  ): Promise<LearningTrailStep | null> {
    const persisted = await this.client.client.learningTrailStep.findFirst({
      where: {
        learningTrailId: learningTrailId.value,
        position,
      },
    });

    return this.toEntity(persisted);
  }

  public async findAllByLearningTrailId(
    learningTrailId: Id,
  ): Promise<LearningTrailStep[]> {
    const persisted = await this.client.client.learningTrailStep.findMany({
      where: {
        learningTrailId: learningTrailId.value,
      },
    });

    return persisted.map(this.toEntity) as LearningTrailStep[];
  }

  public async findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<LearningTrailStep | null> {
    const persisted = await this.client.client.learningTrailStep.findFirst({
      where: {
        id: id.value,
        learningTrail: {
          discipline: {
            course: {
              institutionId: institutionId.value,
            },
          },
        },
      },
    });

    return this.toEntity(persisted);
  }

  protected toEntity(
    persisted: PrismaLearningTrailStep | null,
  ): LearningTrailStep | null {
    if (!persisted) return null;

    const { id, learningTrailId, ...delegate } = persisted;

    return new LearningTrailStep(
      new Id(id),
      delegate.position,
      new Id(learningTrailId),
      delegate.dueDate,
      delegate.availableAt,
      delegate.createdAt,
      delegate.updatedAt,
    );
  }
}
