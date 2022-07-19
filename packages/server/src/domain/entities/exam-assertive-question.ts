import { Id } from "./values";

export class ExamAssertiveQuestion {
  public constructor(
    public readonly id: Id,
    public readonly examQuestionId: Id,
    public readonly assertiveQuestionId: Id,
  ) {}
}
