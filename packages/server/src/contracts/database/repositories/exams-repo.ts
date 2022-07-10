import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";

export interface ExamsRepo {
  save(exam: Exam): Promise<void>;
  findByLearningTrailStepId(learningTrailStepId: Id): Promise<Exam | null>;
  findByIdAndInstitutionId(id: Id, institutionId: Id): Promise<Exam | null>;
  findAllByInstitutionId(institutionId: Id): Promise<Exam[]>;
}
