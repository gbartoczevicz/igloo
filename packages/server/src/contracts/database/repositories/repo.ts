import { ClientDatabase } from "../client";

export abstract class BaseRepo<T, U, V> {
  protected readonly client: ClientDatabase<T>;

  public constructor(client: ClientDatabase<T>) {
    this.client = client;
  }

  protected abstract toEntity(persisted: U | null): V | null;
}
