import { DTOValidationMapping, InDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";
import { CommonErrorOut } from "~/dtos";
import { Either, left, right } from "~/lib/logic/either";
import { Options, validator } from "~/lib/validators";

export namespace CreateUserDTO {
  export class In {
    private constructor(
      public readonly name: string,
      public readonly surname: string | null,
      public readonly email: string,
      public readonly phone: string,
      public readonly password: string,
    ) {}

    public static create(
      income: unknown,
    ): Either<In, CommonErrorOut> {
      const { name, surname, email, phone, password } = income as any || {};

      const errors = validator({
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

      if (errors.length > 0) {
        return right(new CommonErrorOut(errors));
      }

      return left(
        new In(
          name,
          surname || null,
          email,
          phone,
          password,
        ),
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
