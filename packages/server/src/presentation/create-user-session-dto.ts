import { SessionToken } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace CreateUserSessionDTO {
  export class In {
    private constructor(
      public readonly email: string,
      public readonly password: string,
    ) {}

    public static create(
      income: unknown,
    ): In {
      const { email, password } = income as any || {};

      const result = validator({
        email: {
          option: Options.requiredString,
          value: email,
        },
        password: {
          option: Options.requiredString,
          value: password,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(
        email,
        password,
      );
    }
  }

  export class Out {
    public static toRaw(outcoming: SessionToken): unknown {
      return {
        userId: outcoming.userId.value,
        token: outcoming.token,
      };
    }
  }
}
