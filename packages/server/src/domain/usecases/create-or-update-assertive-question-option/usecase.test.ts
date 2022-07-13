import { AssertiveQuestion, AssertiveQuestionOption } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";
import Errors from "./errors";
import { CreateOrUpdateAssertiveQuestionOptionUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      assertiveQuestionOptionsRepo,
      assertiveQuestionsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateOrUpdateAssertiveQuestionOptionUseCase(
      assertiveQuestionOptionsRepo,
      assertiveQuestionsRepo,
    ),
    assertiveQuestionOptionsRepo,
    assertiveQuestionsRepo,
    fixtures: {
      assertiveQuestionShouldShowFeedback: new AssertiveQuestion(
        id,
        id,
        "any",
        "any",
        true,
      ),
      assertiveQuestionShouldNotShowFeedback: new AssertiveQuestion(
        id,
        id,
        "any",
        "any",
        false,
      ),
      institutionId: id,
      optionWithFeedback: new AssertiveQuestionOption(
        id,
        0,
        "",
        true,
        "feedback",
        id,
      ),
      optionWithoutFeedback: new AssertiveQuestionOption(
        id,
        0,
        "",
        true,
        null,
        id,
      ),
    },
  };
}

describe("Create Or Update Assertive Question Option Use Case", () => {
  it("should upsert an option when the question exists and the option have a feedback", async () => {
    const {
      sut,
      assertiveQuestionOptionsRepo,
      assertiveQuestionsRepo,
      fixtures,
    } = createSut();

    jest.spyOn(assertiveQuestionsRepo, "findByIdAndInstitution")
      .mockImplementationOnce(() =>
        Promise.resolve(fixtures.assertiveQuestionShouldShowFeedback)
      );

    const save = jest.spyOn(assertiveQuestionOptionsRepo, "save");

    await sut.execute(fixtures.optionWithFeedback, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.optionWithFeedback);
  });

  it("should upsert an option when the question exists and the option haven't a feedback", async () => {
    const {
      sut,
      assertiveQuestionOptionsRepo,
      assertiveQuestionsRepo,
      fixtures,
    } = createSut();

    jest.spyOn(assertiveQuestionsRepo, "findByIdAndInstitution")
      .mockImplementationOnce(() =>
        Promise.resolve(fixtures.assertiveQuestionShouldNotShowFeedback)
      );

    const save = jest.spyOn(assertiveQuestionOptionsRepo, "save");

    await sut.execute(fixtures.optionWithoutFeedback, fixtures.institutionId);

    expect(save).toBeCalledWith(fixtures.optionWithoutFeedback);
  });

  it("should not upsert an option when the option have a feedback", () => {
    const {
      sut,
      assertiveQuestionsRepo,
      fixtures,
    } = createSut();

    jest.spyOn(assertiveQuestionsRepo, "findByIdAndInstitution")
      .mockImplementationOnce(() =>
        Promise.resolve(fixtures.assertiveQuestionShouldNotShowFeedback)
      );

    const promise = sut.execute(
      fixtures.optionWithFeedback,
      fixtures.institutionId,
    );

    expect(promise).rejects.toBeInstanceOf(Errors.HaveFeedback);
  });

  it("should not upsert an option when the option haven't a feedback", () => {
    const {
      sut,
      assertiveQuestionsRepo,
      fixtures,
    } = createSut();

    jest.spyOn(assertiveQuestionsRepo, "findByIdAndInstitution")
      .mockImplementationOnce(() =>
        Promise.resolve(fixtures.assertiveQuestionShouldShowFeedback)
      );

    const promise = sut.execute(
      fixtures.optionWithoutFeedback,
      fixtures.institutionId,
    );

    expect(promise).rejects.toBeInstanceOf(Errors.FeedbackIsMissing);
  });

  it("should not upsert an option when the position is already in use", () => {
    const {
      sut,
      assertiveQuestionsRepo,
      assertiveQuestionOptionsRepo,
      fixtures,
    } = createSut();

    jest.spyOn(assertiveQuestionsRepo, "findByIdAndInstitution")
      .mockImplementationOnce(() =>
        Promise.resolve(fixtures.assertiveQuestionShouldShowFeedback)
      );

    jest.spyOn(
      assertiveQuestionOptionsRepo,
      "findByPositionAndAssertiveQuestionId",
    ).mockImplementationOnce(() =>
      Promise.resolve(fixtures.optionWithoutFeedback)
    );

    const promise = sut.execute(
      fixtures.optionWithFeedback,
      fixtures.institutionId,
    );

    expect(promise).rejects.toBeInstanceOf(Errors.PositionIsAlreadyInUse);
  });

  it("should not upsert an option when question does not exists", () => {
    const {
      sut,
      fixtures,
    } = createSut();

    const promise = sut.execute(
      fixtures.optionWithoutFeedback,
      fixtures.institutionId,
    );

    expect(promise).rejects.toBeInstanceOf(Errors.AssertiveQuestionNotFound);
  });
});
