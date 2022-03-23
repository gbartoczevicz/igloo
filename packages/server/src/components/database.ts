import { ClientDatabase } from "~/contracts/database/client";
import { Lifecycle } from "~/lib/component";

export class Database<T> extends Lifecycle {
  public readonly client: ClientDatabase<T>;

  public constructor(client: ClientDatabase<T>) {
    super();

    this.client = client;
  }

  public override start(): Lifecycle {
    this.client.connect();

    return new Database(this.client);
  }

  public override stop(): Lifecycle {
    this.client.disconnect();

    return new Database(this.client);
  }
}
