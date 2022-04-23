import { ClientDatabase } from "~/contracts/database/client";
import { Lifecycle } from "~/lib/component";

export class Database<T> extends Lifecycle {
  public readonly client: ClientDatabase<T>;

  public constructor(client: ClientDatabase<T>) {
    super();

    this.client = client;
  }

  public override async start(): Promise<Lifecycle> {
    await this.client.connect();

    return new Database(this.client);
  }

  public override async stop(): Promise<Lifecycle> {
    await this.client.disconnect();

    return new Database(this.client);
  }
}
