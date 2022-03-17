import { DTOValidationMapping, InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";
import { InvalidField } from "~/errors";

export class CreateUserIn {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
    public readonly surname?: string,
  ) {}

  public static create(
    income: unknown,
  ): InDTOResult<CreateUserIn, InvalidField[]> {
    if (income === undefined) {
      throw new Error("Unexpected income");
    }

    const { name, surname, email, phone, password } = income as any;

    const errors: InvalidField[] = [];

    if (typeof name !== "string") {
      errors.push(
        new InvalidField("name", DTOValidationMapping.requiredString),
      );
    }

    if (surname !== undefined && typeof surname !== "string") {
      errors.push(
        new InvalidField("surname", DTOValidationMapping.optionalString),
      );
    }

    if (typeof email !== "string") {
      errors.push(
        new InvalidField("email", DTOValidationMapping.requiredString),
      );
    }

    if (typeof phone !== "string") {
      errors.push(
        new InvalidField("phone", DTOValidationMapping.requiredString),
      );
    }

    if (typeof password !== "string") {
      errors.push(
        new InvalidField("password", DTOValidationMapping.requiredString),
      );
    }

    if (errors.length > 0) {
      return {
        content: errors,
        status: HttpStatus.badRequest,
      } as Result<InvalidField[]>;
    }

    return new CreateUserIn(
      name,
      email,
      phone,
      password,
      surname,
    );
  }
}
