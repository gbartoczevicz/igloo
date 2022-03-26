import { Institution } from "~/domain/entities";
import { Cnpj, Phone } from "~/domain/entities/values";

export interface InstitutionsRepo {
  save(institution: Institution): Promise<void>;
  findByPhone(phone: Phone): Promise<Institution | null>;
  findByCnpj(cnpj: Cnpj): Promise<Institution | null>;
}
