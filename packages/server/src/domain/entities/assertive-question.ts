import { Id } from "./values";

export class AssertiveQuestion {
  public constructor(
    public readonly id: Id,
    public readonly title: string,
    public readonly description: string,
    public readonly shouldShowFeedback: boolean,
  ) {}
}
