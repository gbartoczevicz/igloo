import { InDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";
import { CreateInstitutionIn } from "./create-institution-in";

export class CreateInstitutionAndManagerIn extends InDTO {
  public readonly createInstitutionIn: CreateInstitutionIn;

  public readonly user: User;

  public constructor(createInstitutionIn: CreateInstitutionIn, user: User) {
    super();

    this.createInstitutionIn = createInstitutionIn;
    this.user = user;
  }
}
