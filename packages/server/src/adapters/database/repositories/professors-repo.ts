import { PrismaClient, Professor as PrismaProfessor } from "@prisma/client";
import { BaseRepo, ProfessorsRepo } from "~/contracts/database/repositories";
import { Professor } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaProfessorsRepo
  extends BaseRepo<PrismaClient, PrismaProfessor, Professor>
  implements ProfessorsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(professor: Professor): Promise<void> {
    await this.client.client.professor.upsert({
      create: {
        id: professor.id.value,
        institutionId: professor.institutionId.value,
        userId: professor.userId.value,
      },
      update: {
        institutionId: professor.institutionId.value,
        userId: professor.userId.value,
      },
      where: { id: professor.id.value },
    });
  }

  public async findAllByUserId(userId: Id): Promise<Professor[]> {
    const professorsFound = await this.client.client.professor.findMany({
      where: { userId: userId.value },
    });

    return professorsFound.map((professor) =>
      this.toEntity(professor)
    ) as Professor[];
  }

  public async findByInstitutionAndUser(
    institutionId: Id,
    userId: Id,
  ): Promise<Professor | null> {
    const professorFound = await this.client.client.professor.findUnique({
      where: {
        userId_institutionId: {
          institutionId: institutionId.value,
          userId: userId.value,
        },
      },
    });

    return this.toEntity(professorFound);
  }

  public async findAllByInstitution(institutionId: Id): Promise<Professor[]> {
    const professorsFound = await this.client.client.professor.findMany({
      where: { institutionId: institutionId.value },
    });

    return professorsFound.map((professor) =>
      this.toEntity(professor)
    ) as Professor[];
  }

  public async findByIdAndInstitutionId(
    id: Id,
    institutionId: Id,
  ): Promise<Professor | null> {
    const persisted = await this.client.client.professor.findFirst({
      where: {
        id: id.value,
        institutionId: institutionId.value,
      },
    });

    return this.toEntity(persisted);
  }

  protected override toEntity(
    persisted: PrismaProfessor | null,
  ): Professor | null {
    if (!persisted) return null;

    return new Professor(
      new Id(persisted.id),
      new Id(persisted.userId),
      new Id(persisted.institutionId),
    );
  }
}
