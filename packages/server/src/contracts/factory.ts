export interface Factory<T, U> {
  create(incoming: T): U;
}
