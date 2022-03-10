import { Id } from "~/domain/entities/values";

export interface IdFactory {
  create(value?: string): Id;
}
