import { Service } from "~/contracts/http";

import { Lifecycle } from "./implementation/component";

export class Http<T> extends Lifecycle {
  private readonly service: Service<T>;
  private readonly port: number;

  public constructor(service: Service<T>, port: number) {
    super();

    this.service = service;
    this.port = port;
  }

  public start(): Lifecycle {
    this.service.listen(this.port);

    return new Http(this.service, this.port);
  }

  public stop(): Lifecycle {
    this.service.close();

    return new Http(this.service, this.port);
  }
}
