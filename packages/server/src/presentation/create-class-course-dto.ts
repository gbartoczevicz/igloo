import { ClassCourse } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

type StartDate = {
  year: number;
  month: number;
};

export namespace CreateClassCourseDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly courseId: string,
      public readonly start: StartDate,
    ) {}

    public static create(
      income: unknown,
    ): In {
      const { name, courseId, start } = income as any || {};

      const result = validator({
        name: {
          option: Options.requiredString,
          value: name,
        },
        courseId: {
          option: Options.requiredString,
          value: name,
        },
        start__year: {
          option: Options.requiredNumber,
          value: start?.year,
        },
        start__month: {
          option: Options.requiredNumber,
          value: start?.month,
        },
      });

      console.log(start);

      if (result.isRight()) {
        throw result.value;
      }

      return new In(name, courseId, start);
    }
  }

  export class Out {
    public static toRaw(outcoming: ClassCourse): unknown {
      return {
        id: outcoming.id.value,
        courseId: outcoming.courseId.value,
        name: outcoming.name,
        start: {
          month: outcoming.start.month,
          year: outcoming.start.year,
        },
      };
    }
  }
}
