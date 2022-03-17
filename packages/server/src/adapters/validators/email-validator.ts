import * as Validator from "email-validator";
import { EmailValidator } from "~/contracts/validators";
import { Email } from "~/domain/entities/values";

export class EmailValidatorImpl implements EmailValidator {
  public isValid(email: string | Email): boolean {
    let value: string;

    if (email instanceof Email) {
      value = email.toString();
    } else {
      value = email;
    }

    return Validator.validate(value);
  }
}
