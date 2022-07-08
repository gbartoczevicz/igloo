import {
  ExamsRepo,
  LearningTrailStepsRepo,
} from "~/contracts/database/repositories";
import { Exam } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class CreateOrUpdateExamUseCase {
  public constructor(
    private readonly examsRepo: ExamsRepo,
    private readonly stepsRepo: LearningTrailStepsRepo,
  ) {}

  public async execute(exam: Exam, institutionId: Id) {
    const stepFound = await this.stepsRepo.findByIdAndInstitutionId(
      exam.learningTrailStepId,
      institutionId,
    );

    if (!stepFound) {
      throw new Errors.StepNotFound();
    }

    const examFound = await this.examsRepo.findByLearningTrailStepId(
      exam.learningTrailStepId,
    );

    if (examFound && !examFound.id.isEqual(exam.id)) {
      throw new Errors.StepAlreadyHaveExam();
    }

    await this.examsRepo.save(exam);
  }
}
