import {
  ExamQuestion as PrismaExamQuestion,
  PrismaClient,
} from "@prisma/client";
import { BaseRepo, ExamQuestionsRepo } from "~/contracts/database/repositories";
import { ExamQuestion } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaExamQuestionsRepo
  extends BaseRepo<PrismaClient, PrismaExamQuestion, ExamQuestion>
  implements ExamQuestionsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(question: ExamQuestion): Promise<void> {
    await this.client.client.examQuestion.upsert({
      create: {
        id: question.id.value,
        position: question.position,
        examId: question.examId.value,
      },
      update: {
        position: question.position,
        examId: question.examId.value,
      },
      where: {
        id: question.id.value,
      },
    });
  }

  public async findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<ExamQuestion | null> {
    const persisted = await this.client.client.examQuestion.findFirst({
      where: {
        id: id.value,
        exam: {
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
      },
    });

    return this.toEntity(persisted);
  }

  public async findByExamIdAndPosition(
    examId: Id,
    position: number,
  ): Promise<ExamQuestion | null> {
    const persisted = await this.client.client.examQuestion.findFirst({
      where: {
        examId: examId.value,
        position,
      },
    });

    return this.toEntity(persisted);
  }

  public async findAllByExamId(examId: Id): Promise<ExamQuestion[]> {
    const persisted = await this.client.client.examQuestion.findMany({
      where: {
        examId: examId.value,
      },
    });

    return persisted.map(this.toEntity) as ExamQuestion[];
  }

  protected toEntity(
    persisted: PrismaExamQuestion | null,
  ): ExamQuestion | null {
    if (!persisted) return null;

    return new ExamQuestion(
      new Id(persisted.id),
      persisted.position,
      new Id(persisted.examId),
    );
  }
}
