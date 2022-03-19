import { Email } from "~/domain/entities/values";

export interface EmailValidator {
  isValid(email: Email | string): boolean;
}
