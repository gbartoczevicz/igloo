import { Id } from "./values";

export class LearningTrail {
  public constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly disciplineId: Id,
  ) {}
}
