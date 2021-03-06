import {
  LearningTrail as PrismaLearningTrail,
  PrismaClient,
} from "@prisma/client";
import {
  BaseRepo,
  LearningTrailsRepo,
} from "~/contracts/database/repositories";
import { LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaLearningTrailsRepo
  extends BaseRepo<PrismaClient, PrismaLearningTrail, LearningTrail>
  implements LearningTrailsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(learningTrail: LearningTrail): Promise<void> {
    await this.client.client.learningTrail.upsert({
      create: {
        id: learningTrail.id.value,
        name: learningTrail.name,
        disciplineId: learningTrail.disciplineId.value,
      },
      update: {
        name: learningTrail.name,
        disciplineId: learningTrail.disciplineId.value,
      },
      where: {
        id: learningTrail.id.value,
      },
    });
  }

  public async findAllByInstitutionId(
    institutionId: Id,
  ): Promise<LearningTrail[]> {
    const persisted = await this.client.client.learningTrail.findMany({
      where: {
        discipline: {
          course: {
            institutionId: institutionId.value,
          },
        },
      },
    });

    return persisted.map(this.toEntity) as LearningTrail[];
  }

  public async findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<LearningTrail | null> {
    const persisted = await this.client.client.learningTrail.findFirst({
      where: {
        id: id.value,
        discipline: {
          course: {
            institutionId: institutionId.value,
          },
        },
      },
    });

    return this.toEntity(persisted);
  }

  protected toEntity(
    persisted: PrismaLearningTrail | null,
  ): LearningTrail | null {
    if (!persisted) return null;

    return new LearningTrail(
      new Id(persisted.id),
      persisted.name,
      new Id(persisted.disciplineId),
    );
  }
}
