export type ComponentMap<T> = ReadonlyMap<string, T>;

export type ComponentRecord<T> = Record<string, T>;

export type ContructorParams<T> = ComponentMap<T> | ComponentRecord<T>;

export type ComponentAction<T> = (arg: T) => Promise<T>;

export type ComponentIterable<T> = Array<[string, T]>;

export type UpdateFnParams<T> = {
  lifecycle: T;
  action: ComponentAction<T>;
};

export type ActionRunnerFnParams<T> = {
  iterable: ComponentIterable<T>;
  action: ComponentAction<T>;
};
