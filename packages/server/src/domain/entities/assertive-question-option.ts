import { Id } from "./values";

export class AssertiveQuestionOption {
  public constructor(
    public readonly id: Id,
    public readonly position: number,
    public readonly content: string,
    public readonly isCorrect: boolean,
    public readonly feedback: string | null,
    public readonly assertiveQuestionId: Id,
  ) {}
}
