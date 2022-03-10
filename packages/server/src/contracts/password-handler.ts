import { Password } from "~/domain/entities/values";

export interface PasswordHandler {
  encode(value: string): Promise<Password>;
  compare(value1: string, value2: string): Promise<boolean>;
}
