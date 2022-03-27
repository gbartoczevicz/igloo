import { Institution as PrismaInstitution, PrismaClient } from "@prisma/client";
import { BaseRepo, InstitutionsRepo } from "~/contracts/database/repositories";
import { Institution } from "~/domain/entities";
import { Cnpj, Id, Phone } from "~/domain/entities/values";
import { PrismaClientDatabase } from "../client";

export class PrismaInstitutionsRepo
  extends BaseRepo<PrismaClient, PrismaInstitution, Institution>
  implements InstitutionsRepo {
  public constructor(client: PrismaClientDatabase) {
    super(client);
  }

  public async save(institution: Institution): Promise<void> {
    await this.client.client.institution.upsert({
      create: {
        id: institution.id.value,
        cnpj: institution.cnpj.toString(),
        name: institution.name,
        phone: institution.phone.toString(),
      },
      update: {
        cnpj: institution.cnpj.toString(),
        name: institution.name,
        phone: institution.phone.toString(),
      },
      where: {
        id: institution.id.value,
      },
    });
  }

  public async findByCnpj(cnpj: Cnpj): Promise<Institution | null> {
    const foundInstitution = await this.client.client.institution.findUnique({
      where: { cnpj: cnpj.toString() },
    });

    return this.toEntity(foundInstitution);
  }

  public async findById(id: Id): Promise<Institution | null> {
    const foundInstitution = await this.client.client.institution.findUnique({
      where: { id: id.value },
    });

    return this.toEntity(foundInstitution);
  }

  public async findByPhone(phone: Phone): Promise<Institution | null> {
    const foundInstitution = await this.client.client.institution.findUnique({
      where: { phone: phone.toString() },
    });

    return this.toEntity(foundInstitution);
  }

  protected toEntity(persisted: PrismaInstitution | null): Institution | null {
    if (!persisted) return null;

    return new Institution(
      new Id(persisted.id),
      persisted.name,
      new Cnpj(persisted.cnpj),
      new Phone(persisted.phone),
    );
  }
}
