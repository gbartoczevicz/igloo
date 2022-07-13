import {
  AssertiveQuestionOptionsRepo,
  AssertiveQuestionsRepo,
} from "~/contracts/database/repositories";
import { AssertiveQuestionOption } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import Errors from "./errors";

export class CreateOrUpdateAssertiveQuestionOptionUseCase {
  public constructor(
    private readonly assertiveQuestionOptionsRepo: AssertiveQuestionOptionsRepo,
    private readonly assertiveQuestionsRepo: AssertiveQuestionsRepo,
  ) {}

  public async execute(option: AssertiveQuestionOption, institutionId: Id) {
    const question = await this.assertiveQuestionsRepo.findByIdAndInstitution(
      option.assertiveQuestionId,
      institutionId,
    );

    if (!question) {
      throw new Errors.AssertiveQuestionNotFound();
    }

    const feedback = option.feedback || "";

    if (question.shouldShowFeedback && feedback.length === 0) {
      throw new Errors.FeedbackIsMissing();
    }

    if (!question.shouldShowFeedback && feedback.length > 0) {
      throw new Errors.HaveFeedback();
    }

    const optionInSamePosition = await this.assertiveQuestionOptionsRepo
      .findByPositionAndAssertiveQuestionId(
        option.position,
        option.assertiveQuestionId,
      );

    if (optionInSamePosition) {
      throw new Errors.PositionIsAlreadyInUse();
    }

    await this.assertiveQuestionOptionsRepo.save(option);
  }
}
