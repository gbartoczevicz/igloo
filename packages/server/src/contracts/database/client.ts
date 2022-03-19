export abstract class ClientDatabase<T> {
  public readonly client: T;

  public constructor(client: T) {
    this.client = client;
  }

  public abstract connect(): void;
  public abstract disconnect(): void;
}
