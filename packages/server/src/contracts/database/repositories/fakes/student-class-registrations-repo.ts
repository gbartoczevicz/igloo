import { StudentClassRegistration } from "~/domain/entities";
import { StudentClassRegistrationsRepo } from "~/contracts/database/repositories";

export class FakeStudentClassRegistrationsRepo
  implements StudentClassRegistrationsRepo {
  public async save(_registration: StudentClassRegistration): Promise<void> {
    return Promise.resolve();
  }
}
