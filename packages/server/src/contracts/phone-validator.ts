import { Phone } from "~/domain/entities/values";

export interface PhoneValidator {
  isValid(phone: Phone | string): boolean;
}
