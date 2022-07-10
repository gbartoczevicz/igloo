import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { ExamsRepo } from "../exams-repo";

export class FakeExamsRepo implements ExamsRepo {
  public async save(_exam: Exam): Promise<void> {
    return Promise.resolve();
  }

  public async findByLearningTrailStepId(
    _learningTrailStepId: Id,
  ): Promise<Exam | null> {
    return Promise.resolve(null);
  }

  public async findByIdAndInstitutionId(
    _id: Id,
    _institutionId: Id,
  ): Promise<Exam | null> {
    return Promise.resolve(null);
  }

  public async findAllByInstitutionId(_institutionId: Id): Promise<Exam[]> {
    return Promise.resolve([]);
  }
}
