import { Id } from "./values";

export class Exam {
  public constructor(
    public readonly id: Id,
    public readonly learningTrailStepId: Id,
  ) {}
}
