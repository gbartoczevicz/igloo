export abstract class BaseRepo<T> {
  protected readonly client: T;

  public constructor(client: T) {
    this.client = client;
  }
}
