import { User } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace UpdateUserDTO {
  export class In {
    private constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly surname: string | null,
      public readonly email: string,
      public readonly phone: string,
      public readonly password: string,
    ) {}

    public static create(
      income: unknown,
    ): In {
      const { id, name, surname, email, phone, password } = income as any || {};

      const result = validator({
        id: {
          option: Options.requiredString,
          value: id,
        },
        name: {
          option: Options.requiredString,
          value: name,
        },
        surname: {
          option: Options.optionalString,
          value: surname,
        },
        email: {
          option: Options.requiredString,
          value: email,
        },
        phone: {
          option: Options.requiredString,
          value: phone,
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
        id,
        name,
        surname || null,
        email,
        phone,
        password,
      );
    }
  }

  export class Out {
    public static toRaw(outcoming: User): unknown {
      return {
        id: outcoming.id.value,
        name: outcoming.name,
        surname: outcoming.surname,
        email: outcoming.email.toString(),
        phone: outcoming.phone.toString(),
      };
    }
  }
}
