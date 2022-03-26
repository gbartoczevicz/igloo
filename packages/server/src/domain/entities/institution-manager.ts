import { Id } from "./values";

export class InstitutionManager {
  public readonly userId: Id;

  public readonly institutionId: Id;

  public constructor(userId: Id, institutionId: Id) {
    this.userId = userId;
    this.institutionId = institutionId;
  }
}
