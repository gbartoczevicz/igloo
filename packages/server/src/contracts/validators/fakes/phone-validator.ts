import { Phone } from "~/domain/entities/values";
import { PhoneValidator } from "../phone-validator";

export class FakePhoneValidator implements PhoneValidator {
  public isValid(_phone: string | Phone): boolean {
    return true;
  }
}
