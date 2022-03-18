export abstract class BaseRepo<T, U, V> {
  protected readonly client: T;

  public constructor(client: T) {
    this.client = client;
  }

  protected abstract toEntity(persisted: U): V;
}
