import { DomainError } from "~/errors";

export type OnDomainError = (err: DomainError) => void;

export type OnSuccess<T = void> = (param?: T) => void;
