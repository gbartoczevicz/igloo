import { Id } from "./values";

export class SessionToken {
  public readonly id: Id;

  public readonly token: string;

  public readonly userId: Id;

  public constructor(id: Id, token: string, userId: Id) {
    this.id = id;
    this.token = token;
    this.userId = userId;
  }
}
