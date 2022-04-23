import { Service } from "~/contracts/http";
import { Lifecycle } from "~/lib/component";

export class Http<T> extends Lifecycle {
  private readonly service: Service<T>;
  private readonly port: number;

  public constructor(service: Service<T>, port: number) {
    super();

    this.service = service;
    this.port = port;
  }

  public override async start(): Promise<Lifecycle> {
    this.service.listen(this.port);

    return new Http(this.service, this.port);
  }

  public override async stop(): Promise<Lifecycle> {
    this.service.close();

    return new Http(this.service, this.port);
  }
}
