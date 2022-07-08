import { Id } from "./values";

export class ExamQuestion {
  public constructor(
    public readonly id: Id,
    public readonly position: number,
    public readonly examId: Id,
  ) {}
}
