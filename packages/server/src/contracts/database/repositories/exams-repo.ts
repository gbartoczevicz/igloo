import { Exam } from "~/domain/entities";

export interface ExamsRepo {
  save(exam: Exam): Promise<void>;
}
