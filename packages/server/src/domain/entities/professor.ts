import { Id } from "./values";

export class Professor {
  public readonly id: Id;

  public readonly userId: Id;

  public readonly institutionId: Id;

  public constructor(id: Id, userId: Id, institutionId: Id) {
    this.id = id;
    this.userId = userId;
    this.institutionId = institutionId;
  }
}
