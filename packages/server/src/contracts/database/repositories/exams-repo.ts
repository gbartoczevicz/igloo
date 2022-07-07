import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ExamsRepo {
  save(exam: Exam): Promise<void>;
  findByLearningTrailStepId(learningTrailStepId: Id): Promise<Exam | null>;
}
