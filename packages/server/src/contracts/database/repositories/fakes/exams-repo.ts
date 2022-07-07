import { Exam } from "~/domain/entities";
import { ExamsRepo } from "../exams-repo";

export class FakeExamsRepo implements ExamsRepo {
  public async save(_exam: Exam): Promise<void> {
    return Promise.resolve();
  }
}
