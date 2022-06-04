import { Email } from "~/domain/entities/values";
import { EmailValidator } from "../email-validator";

export class FakeEmailValidator implements EmailValidator {
  public isValid(_email: string | Email): boolean {
    return true;
  }
}
