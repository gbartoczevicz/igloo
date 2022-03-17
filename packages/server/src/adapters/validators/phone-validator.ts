import { isValidPhoneNumber } from "libphonenumber-js";

import { PhoneValidator } from "~/contracts/validators";
import { Phone } from "~/domain/entities/values";

export class PhoneValidatorImpl implements PhoneValidator {
  public isValid(phone: Phone | string): boolean {
    let value: string;

    if (phone instanceof Phone) {
      value = phone.toString();
    } else {
      value = phone;
    }

    return isValidPhoneNumber(value, "BR");
  }
}
