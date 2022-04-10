import {
  InstitutionManager as PrismaInstitutionManager,
  PrismaClient,
} from "@prisma/client";
import {
  BaseRepo,
  InstitutionManagersRepo,
} from "~/contracts/database/repositories";
import { InstitutionManager } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaInstitutionManagersRepo
  extends BaseRepo<PrismaClient, PrismaInstitutionManager, InstitutionManager>
  implements InstitutionManagersRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(manager: InstitutionManager): Promise<void> {
    await this.client.client.institutionManager.upsert({
      create: {
        id: manager.id.value,
        institutionId: manager.institutionId.value,
        userId: manager.userId.value,
      },
      update: {
        institutionId: manager.institutionId.value,
        userId: manager.userId.value,
      },
      where: { id: manager.id.value },
    });
  }

  public async findAllByUserId(userId: Id): Promise<InstitutionManager[]> {
    const foundManagers = await this.client.client.institutionManager.findMany({
      where: { userId: userId.value },
    });

    return foundManagers.map((foundManager) =>
      this.toEntity(foundManager)
    ) as InstitutionManager[];
  }

  public async findByInstitutionId(
    institutionId: Id,
  ): Promise<InstitutionManager | null> {
    const foundManager = await this.client.client.institutionManager.findUnique(
      {
        where: { institutionId: institutionId.value },
      },
    );

    return this.toEntity(foundManager);
  }

  protected toEntity(
    persisted: PrismaInstitutionManager | null,
  ): InstitutionManager | null {
    if (!persisted) return null;

    return new InstitutionManager(
      new Id(persisted.id),
      new Id(persisted.userId),
      new Id(persisted.institutionId),
    );
  }
}
