export type ComponentMap<T> = ReadonlyMap<string, T>;

export type ComponentRecord<T> = Record<string, T>;

export type ComponenMapRecord<T> = ComponentMap<T> | ComponentRecord<T>;

export type ComponentAction<T> = (arg: T) => T;

export type ComponentIterable<T> = Array<[string, T]>;
