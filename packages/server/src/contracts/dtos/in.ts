export interface InDTO<T> {
  create(incoming: unknown): T;
}
