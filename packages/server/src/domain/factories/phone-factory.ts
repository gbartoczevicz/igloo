import { Factory } from "~/contracts/domain";
import { PhoneValidator } from "~/contracts/validators";
import { Phone } from "~/domain/entities/values";
import { DomainError } from "~/errors";

export class PhoneFactory implements Factory<string, Phone> {
  private readonly phoneValidator: PhoneValidator;

  public constructor(phoneValidator: PhoneValidator) {
    this.phoneValidator = phoneValidator;
  }

  public create(incoming: string): Phone {
    if (!incoming) {
      throw new DomainError("Phone is required");
    }

    if (!this.phoneValidator.isValid(incoming)) {
      throw new DomainError("Phone is invalid");
    }

    return new Phone(incoming);
  }
}
