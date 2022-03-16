import { InDTOResult } from "~/contracts/dtos";
import { HttpStatus } from "~/contracts/http";
import { Result } from "~/contracts/presentation";
import { InvalidField } from "~/errors";

export class CreateUserIn {
  private constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
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
      errors.push(new InvalidField("name", "is a required string"));
    }

    if (surname !== undefined && typeof surname !== "string") {
      errors.push(new InvalidField("surname", "is a string"));
    }

    if (typeof email !== "string") {
      errors.push(new InvalidField("email", "is a required string"));
    }

    if (typeof phone !== "string") {
      errors.push(new InvalidField("phone", "is a required string"));
    }

    if (typeof password !== "string") {
      errors.push(new InvalidField("password", "is a required string"));
    }

    if (errors.length > 0) {
      const result: Result<InvalidField[]> = {
        content: errors,
        status: HttpStatus.badRequest,
      };

      return result;
    }

    return new CreateUserIn(
      name,
      surname,
      email,
      phone,
      password,
    );
  }
}
