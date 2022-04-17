import { DTOValidationMapping, InDTO } from "~/contracts/dtos";
import { User } from "~/domain/entities";
import { CommonErrorOut } from "~/dtos";
import { Either, left, right } from "~/lib/logic/either";

export namespace CreateUserDTO {
  export class In extends InDTO {
    private constructor(
      public readonly name: string,
      public readonly surname: string | null,
      public readonly email: string,
      public readonly phone: string,
      public readonly password: string,
    ) {
      super();
    }

    public static create(
      income: unknown,
    ): Either<In, CommonErrorOut> {
      const { name, surname, email, phone, password } = income as any || {};

      const errors = this.validate({
        name: {
          validationType: DTOValidationMapping.requiredString,
          value: name,
        },
        surname: {
          validationType: DTOValidationMapping.optionalString,
          value: surname,
        },
        email: {
          validationType: DTOValidationMapping.requiredString,
          value: email,
        },
        phone: {
          validationType: DTOValidationMapping.requiredString,
          value: phone,
        },
        password: {
          validationType: DTOValidationMapping.requiredString,
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
