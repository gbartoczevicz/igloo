import { DomainError } from "~/errors";

export type OnCommonEvent<T = void> = (param: T) => void;

export type OnDomainError = OnCommonEvent<DomainError>;

export type OnInternalError = OnCommonEvent<Error>;
