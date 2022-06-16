import { StudentClassRegistration } from "~/domain/entities";

export interface StudentClassRegistrationsRepo {
  save(registration: StudentClassRegistration): Promise<void>;
}
