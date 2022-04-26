import { Id } from "./values";

export class Course {
  public readonly id: Id;

  public readonly name: string;

  public readonly institutionId: Id;

  public constructor(id: Id, name: string, institutionId: Id) {
    this.id = id;
    this.name = name;
    this.institutionId = institutionId;
  }
}
