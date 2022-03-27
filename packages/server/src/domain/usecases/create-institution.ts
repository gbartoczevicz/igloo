import { InstitutionsRepo } from "~/contracts/database/repositories";
import { CreateInstitutionIn } from "~/dtos";
import { DomainError } from "~/errors";
import { Institution } from "../entities";
import { InstitutionFactory } from "../factories";

export class CreateInstitutionUseCase {
  private readonly institutionFactory: InstitutionFactory;

  private readonly institutionsRepo: InstitutionsRepo;

  public constructor(
    institutionFactory: InstitutionFactory,
    institutionsRepo: InstitutionsRepo,
  ) {
    this.institutionFactory = institutionFactory;
    this.institutionsRepo = institutionsRepo;
  }

  public async execute(incoming: CreateInstitutionIn): Promise<Institution> {
    const institution = this.institutionFactory.create(incoming);

    const phoneAlreadyInUse = await this.institutionsRepo.findByPhone(
      institution.phone,
    );

    if (phoneAlreadyInUse) {
      throw new DomainError("Phone is already in use");
    }

    const cnpjAlreadyInUse = await this.institutionsRepo.findByCnpj(
      institution.cnpj,
    );

    if (cnpjAlreadyInUse) {
      throw new DomainError("Cnpj is already in use");
    }

    await this.institutionsRepo.save(institution);

    return institution;
  }
}
