import { Institution } from "~/domain/entities";
import { Cnpj, Id, Phone } from "~/domain/entities/values";

export interface InstitutionsRepo {
  save(institution: Institution): Promise<void>;
  findById(id: Id): Promise<Institution | null>;
  findByPhone(phone: Phone): Promise<Institution | null>;
  findByCnpj(cnpj: Cnpj): Promise<Institution | null>;
}
