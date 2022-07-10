import { Options, validator } from "~/lib/validators";
import { ExamQuestion } from "../entities";
import { IdFactory } from "./id-factory";

export class ExamQuestionFactory {
  public constructor(
    private readonly idFactory: IdFactory,
  ) {}

  public toEntity(params: any = {}): ExamQuestion {
    const result = validator({
      id: {
        value: params.id,
        option: Options.optionalString,
      },
      position: {
        value: params.position,
        option: Options.requiredNumber,
      },
      examId: {
        value: params.examId,
        option: Options.requiredString,
      },
    });

    if (result.isRight()) {
      throw result.value;
    }

    const id = this.idFactory.create(params.id);
    const position = Number(params.position);
    const examId = this.idFactory.create(
      params.examId,
    );

    return new ExamQuestion(id, position, examId);
  }

  public toPresentation(question: ExamQuestion) {
    return {
      id: question.id.value,
      examId: question.examId.value,
      position: question.position,
    };
  }
}
