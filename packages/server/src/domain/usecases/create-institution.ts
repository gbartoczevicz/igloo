import { InstitutionsRepo } from "~/contracts/database/repositories";
import * as Errors from "~/domain/errors";
import { Institution } from "../entities";
import { InstitutionFactory } from "../factories";

type Params = {
  name: string;
  cnpj: string;
  phone: string;
};

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

  public async execute(incoming: Params): Promise<Institution> {
    const institution = this.institutionFactory.create(incoming);

    const phoneAlreadyInUse = await this.institutionsRepo.findByPhone(
      institution.phone,
    );

    if (phoneAlreadyInUse) {
      throw new Errors.PhoneAlreadyInUse();
    }

    const cnpjAlreadyInUse = await this.institutionsRepo.findByCnpj(
      institution.cnpj,
    );

    if (cnpjAlreadyInUse) {
      throw new Errors.CnpjAlreadyInUse();
    }

    await this.institutionsRepo.save(institution);

    return institution;
  }
}
