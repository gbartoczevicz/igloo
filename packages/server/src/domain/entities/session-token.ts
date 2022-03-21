import { Id } from "./values";

export class SessionToken {
  public readonly token: string;

  public readonly userId: Id;

  public constructor(token: string, userId: Id) {
    this.token = token;
    this.userId = userId;
  }
}
