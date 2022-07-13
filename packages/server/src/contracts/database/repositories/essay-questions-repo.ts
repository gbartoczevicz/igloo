import { EssayQuestion } from "~/domain/entities";

export interface EssayQuestionsRepo {
  save(question: EssayQuestion): Promise<void>;
}
