import { Id } from "./values";

export class LearningTrailStep {
  public constructor(
    public readonly id: Id,
    public readonly position: number,
    public readonly learningTrailId: Id,
    public readonly dueDate: Date,
    public readonly availableAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
