import { User } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace AuthenticateUserDTO {
  export class In {
    private constructor(
      public readonly token: string,
    ) {}

    public static create(
      income: unknown,
    ): In {
      const { token } = income as any || {};

      const result = validator({
        token: {
          option: Options.requiredString,
          value: token,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(token);
    }
  }

  export class Out {
    public static toRaw(outcoming: User): unknown {
      return outcoming;
    }
  }
}
