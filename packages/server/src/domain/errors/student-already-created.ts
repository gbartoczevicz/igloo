import { DomainError } from "~/errors";

export class StudentAlreadyCreated extends DomainError {
  public constructor() {
    super("The student is already created in this institution");
  }
}
