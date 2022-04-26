export abstract class ClientDatabase<T> {
  public readonly client: T;

  public constructor(client: T) {
    this.client = client;
  }

  public abstract connect(): Promise<void>;
  public abstract disconnect(): Promise<void>;
}
