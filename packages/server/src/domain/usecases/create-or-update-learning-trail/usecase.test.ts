import { Discipline, LearningTrail } from "~/domain/entities";
import { Id } from "~/domain/entities/values";
import { systemTestSetup } from "~/setup/system-test";

import Errors from "./errors";
import { CreateOrUpdateLearningTrailUseCase } from "./usecase";

function createSut() {
  const {
    repositories: {
      disciplinesRepo,
      learningTrailsRepo,
    },
  } = systemTestSetup();

  const id = new Id("any");

  return {
    sut: new CreateOrUpdateLearningTrailUseCase(
      disciplinesRepo,
      learningTrailsRepo,
    ),
    disciplinesRepo,
    learningTrailsRepo,
    fixture: {
      discipline: new Discipline(id, "any", id),
      learningTrail: new LearningTrail(id, "any", id),
    },
  };
}

describe("Create or Update Learning Trail Use Case", () => {
  it("should persist a learning trail", async () => {
    const { sut, disciplinesRepo, learningTrailsRepo, fixture } = createSut();

    const findById = jest.spyOn(disciplinesRepo, "findById")
      .mockImplementationOnce(() => Promise.resolve(fixture.discipline));
    const save = jest.spyOn(learningTrailsRepo, "save");

    await sut.execute(fixture.learningTrail);

    expect(findById).toBeCalledWith(fixture.learningTrail.disciplineId);
    expect(save).toBeCalledWith(fixture.learningTrail);
  });

  it("should check if the discipline exists before persisting a learning trail", async () => {
    const { sut, disciplinesRepo, learningTrailsRepo, fixture } = createSut();

    const findById = jest.spyOn(disciplinesRepo, "findById");
    const save = jest.spyOn(learningTrailsRepo, "save");

    const rejection = sut.execute(fixture.learningTrail);

    expect(rejection).rejects.toBeInstanceOf(Errors.DisciplineNotFound);
    expect(findById).toBeCalledWith(fixture.learningTrail.disciplineId);
    expect(save).toBeCalledTimes(0);
  });
});
