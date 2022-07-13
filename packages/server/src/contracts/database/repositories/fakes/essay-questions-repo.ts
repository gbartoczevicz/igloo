import { EssayQuestion } from "~/domain/entities";
import { EssayQuestionsRepo } from "../essay-questions-repo";

export class FakeEssayQuestionsRepo implements EssayQuestionsRepo {
  public async save(_question: EssayQuestion): Promise<void> {
    return Promise.resolve();
  }
}
