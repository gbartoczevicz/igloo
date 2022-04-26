import { EmailValidator } from "~/contracts/validators";
import { Email } from "~/domain/entities/values";
import { DomainError } from "~/errors";

export class EmailFactory {
  private readonly emailValidator: EmailValidator;

  public constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  public create(incoming: string): Email {
    if (!incoming) {
      throw new DomainError("E-mail is required");
    }

    if (!this.emailValidator.isValid(incoming)) {
      throw new DomainError("The e-mail is invalid");
    }

    return new Email(incoming);
  }
}
