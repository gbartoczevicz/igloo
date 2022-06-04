import { Institution } from "~/domain/entities";
import { Cnpj, Id, Phone } from "~/domain/entities/values";
import { InstitutionsRepo } from "../institutions-repo";

export class FakeInstitutionsRepo implements InstitutionsRepo {
  public async save(_institution: Institution): Promise<void> {
  }

  public async findById(_id: Id): Promise<Institution | null> {
    return null;
  }

  public async findByPhone(_phone: Phone): Promise<Institution | null> {
    return null;
  }

  public async findByCnpj(_cnpj: Cnpj): Promise<Institution | null> {
    return null;
  }

  public async findAllById(_ids: Id[]): Promise<Institution[]> {
    return [];
  }
}
